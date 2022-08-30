/** @jsxImportSource @emotion/react */
import { useEffect, Fragment } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Collapse from "../Collapse/Collapse";
import { noop, isNumeric, getNodeKey } from "../../util";
import { useAppData } from "../../app/store";
import {
  MdChevronRight as IconChevron,
  MdFolder as IconFolder,
  MdFolderOpen as IconFolderOpen,
  MdOutlineInsertDriveFile as IconFile,
} from "../icons";
import foldersDefault from "../../assets/folders";
//
const styleRoot = css`
  text-align: left !important;
`;
const styleCollapseContent = ({ indent, guides, indentGuides }) => css`
  padding-left: ${indent ? (isNumeric(indent) ? indent + "px" : indent) : 0};
  padding-top: 0.1rem;
  padding-bottom: 0.22rem;
  border-left: ${guides || 0};
  margin-left: ${indentGuides || 0};
`;
const styleFileSystemEntry = css`
  cursor: pointer;
  user-select: none;
`;
const styleIconCollapse = css`
  opacity: 0.33;
  display: inline-block;
  margin: 0;
  padding: 0;
  transition: transform 0.122s ease-out;
  &:hover {
    transform: scale(1.22);
    opacity: 1;
  }
`;
const styleIconCollapseContainer = css`
  display: inline-block;
  transition: transform 0.1s linear;
`;
const styleLabel = css`
  display: inline-block;
  opacity: 0.82;
  &:hover {
    opacity: 1;
  }
`;
const styleLabelSelected = css`
  font-weight: bold;
`;
const styleIconFolder = css`
  display: inline-block;
  opacity: 0.75;
`;
const styleIconFolderOpen = css`
  display: inline-block;
  opacity: 0.75;
`;
const styleIconFile = css`
  display: inline-block;
  opacity: 0.56;
`;
const styleIconFileSelected = css`
  display: inline-block;
  opacity: 1;
  transform: scale(1.1);
`;
const styleLabelText = css`
  font-size: 88%;
  opacity: 0.88;
`;
//
const Widget = styled.section`
  ${styleRoot}
`;
const CollapseContent = styled.div`
  ${styleCollapseContent}
`;
const FilesystemEntryContent = styled.div`
  ${styleFileSystemEntry}
`;
//
const DEFAULT_FS = foldersDefault;
const DEFAULT_CHEVRON_SIZE = "1.22rem";
const DEFAULT_FOLDER_SIZE = DEFAULT_CHEVRON_SIZE;
const DEFAULT_FILE_SIZE = "1.1rem";
//
const Filesystem = ({
  /* fs: tree{} @https://github.com/nikolav/treejs */
  fs = DEFAULT_FS,
  //
  ID = "@Filesystem",
  //
  indent = ".32rem",
  //
  indentFile = "1.22em",
  //
  guides = "1px dotted rgba(0, 0, 0, .22)",
  //
  indentGuides = ".5rem",
  //
  width = "100%",
  //
  height = "100%",
  //
  iconCollapseSize = DEFAULT_CHEVRON_SIZE,
  //
  iconCollapse = (
    <IconChevron
      style={{
        fontSize: iconCollapseSize,
      }}
      css={css([styleIconCollapse])}
    />
  ),
  //
  iconFolderSize = DEFAULT_FOLDER_SIZE,
  //
  iconFolder = (
    <IconFolder style={{ fontSize: iconFolderSize }} css={[styleIconFolder]} />
  ),
  //
  iconFolderOpened = (
    <IconFolderOpen
      style={{ fontSize: iconFolderSize }}
      css={[styleIconFolderOpen]}
    />
  ),
  //
  iconFileSize = DEFAULT_FILE_SIZE,
  //
  iconFile = (
    <IconFile style={{ fontSize: iconFileSize }} css={[styleIconFile]} />
  ),
  //
  iconFileSelected = (
    <IconFile
      style={{ fontSize: iconFileSize }}
      css={[styleIconFileSelected]}
    />
  ),
  //
  onSelect = noop,
  //
  ...rest
}) => {
  //
  const fileSelected = `${ID}.fileSelected`;
  const appdata = useAppData();
  if (!appdata.has(ID)) appdata.set(ID, {});
  //
  const selected = appdata(fileSelected);
  useEffect(() => {
    onSelect(selected && fs.byid(fileSelected));
  }, [selected]);
  //
  // recurse-build folders
  // pass props down to *
  return (
    <Widget style={{ width, height }} {...rest}>
      {fs.ls().map(build, {
        appdata,
        ID,
        guides,
        fileSelected,
        indent,
        indentGuides,
        indentFile,
        iconCollapse,
        iconFolder,
        iconFolderOpened,
        iconFile,
        iconFileSelected,
      })}
    </Widget>
  );
};

export default Filesystem;

// recurse-map folders to jsx
function build(node, _index) {
  const {
    indent,
    guides,
    indentGuides,
    appdata,
    ID,
    iconCollapse,
    indentFile,
    fileSelected,
    iconFolder,
    iconFolderOpened,
    iconFile,
    iconFileSelected,
  } = this;
  //
  const fs = appdata(ID);
  const nodeKey = getNodeKey(node);
  const isOpen = fs && fs[nodeKey];
  const isSelected = nodeKey === appdata(fileSelected);
  const isEmpty = 0 === node.len();
  //
  const toggleOpen = () => appdata.set(ID, { ...fs, [nodeKey]: !fs[nodeKey] });
  const toggleFileSelected = () => {
    // on.off
    appdata.set(fileSelected, isSelected ? null : nodeKey);
    // tag node to access it in .onSelect
    node.id(fileSelected);
  };
  //
  return isFolder_(node) ? (
    <Fragment key={nodeKey}>
      <FilesystemEntry
        node={node}
        isFolder={true}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        iconCollapse={iconCollapse}
        iconFolder={iconFolder}
        iconFolderOpened={iconFolderOpened}
      />
      {!isEmpty && (
        <Collapse isOpen={isOpen}>
          <CollapseContent
            guides={guides}
            indent={indent}
            indentGuides={indentGuides}
          >
            {node.ls().map(build, this)}
          </CollapseContent>
        </Collapse>
      )}
    </Fragment>
  ) : (
    <FilesystemEntry
      key={nodeKey}
      node={node}
      isFile={true}
      isSelected={isSelected}
      onSelect={toggleFileSelected}
      indentFile={indentFile}
      iconFile={iconFile}
      iconFileSelected={iconFileSelected}
    />
  );
}

function FilesystemEntry({
  node,
  iconCollapse = null,
  isOpen = null,
  toggleOpen = noop,
  isFile = null,
  isFolder = null,
  isSelected = null,
  indentFile = "auto",
  onSelect = noop,
  iconFile = null,
  iconFileSelected = null,
  iconFolder = null,
  iconFolderOpened = null,
}) {
  //
  const nodeValue = node.value();
  const { label } = nodeValue;
  //
  return (
    <FilesystemEntryContent onClick={toggleOpen}>
      {/* icon.collapse */}
      {isFolder && iconCollapse && (
        <strong
          style={{
            transform: `rotate(${isOpen ? "90deg" : 0})`,
          }}
          css={[styleIconCollapseContainer]}
        >
          {iconCollapse}
        </strong>
      )}
      <span
        onClick={onSelect}
        style={{
          paddingLeft: indentFile,
        }}
        css={[styleLabel, isFile && isSelected && styleLabelSelected]}
      >
        <span className="flex space-x-2 items-end">
          {/* icon */}
          <strong>
            {isFile && (isSelected ? iconFileSelected : iconFile)}
            {isFolder && (isOpen ? iconFolderOpened : iconFolder)}
          </strong>
          {/* label */}
          <span css={[styleLabelText]}>{label}</span>
        </span>
      </span>
    </FilesystemEntryContent>
  );
}

function isFolder_(node) {
  return node.value()["_hasChildren"];
}
