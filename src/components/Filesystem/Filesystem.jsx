/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, Fragment } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Collapse from "../Collapse/Collapse";
import { tree, noop, isNumeric } from "../../util";
import { useAppData } from "../../app/store";
import {
  MdChevronRight as IconChevron,
  MdFolder as IconFolder,
  MdFolderOpen as IconFolderOpen,
  MdOutlineInsertDriveFile as IconFile,
} from "../icons";
import folders from "../../assets/folders";
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
const styleFileSystemEntry = (props) => css`
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
  opacity: .88;
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
const DEFAULT_FS = folders;
const DEFAULT_CHEVRON_SIZE = "1.22rem";
const DEFAULT_FOLDER_SIZE = DEFAULT_CHEVRON_SIZE;
const DEFAULT_FILE_SIZE = "1.1rem";
//
const Filesystem = ({
  /* fs: tree{} */
  fs = DEFAULT_FS,
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
  ID = "@Filesystem",
  //
  indent = ".22rem",
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
    selected && onSelect(fs.byid(fileSelected));
  }, [selected]);
  //
  return (
    <Widget style={{ width, height }} {...rest}>
      {fs.ls().map(build, {
        appdata,
        ID,
        iconCollapse,
        indent,
        guides,
        indentGuides,
        indentFile,
        fileSelected,
        iconFolder,
        iconFolderOpened,
        iconFile,
        iconFileSelected,
      })}
    </Widget>
  );
};

export default Filesystem;

//
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
  const nodeKey = nodeKey_(node);
  const isOpen = fs && fs[nodeKey];
  const isSelected = nodeKey === appdata(fileSelected);
  //
  const toggleOpen = () => appdata.set(ID, { ...fs, [nodeKey]: !fs[nodeKey] });
  const toggleFileSelected = () => {
    appdata.set(fileSelected, isSelected ? null : nodeKey);
    node.id(fileSelected);
  };
  //
  return !isEmpty(node) ? (
    <Fragment key={nodeKey}>
      <FilesystemEntry
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        node={node}
        iconCollapse={iconCollapse}
        isFolder={true}
        iconFolder={iconFolder}
        iconFolderOpened={iconFolderOpened}
      />
      <Collapse isOpen={isOpen}>
        <CollapseContent
          guides={guides}
          indent={indent}
          indentGuides={indentGuides}
        >
          {node.ls().map(build, this)}
        </CollapseContent>
      </Collapse>
    </Fragment>
  ) : (
    <FilesystemEntry
      node={node}
      key={nodeKey}
      isFile={true}
      indentFile={indentFile}
      iconFile={iconFile}
      iconFileSelected={iconFileSelected}
      isSelected={isSelected}
      onSelect={toggleFileSelected}
    />
  );
}

function FilesystemEntry({
  node,
  iconCollapse = null,
  isOpen = null,
  toggleOpen = noop,
  isFile = null,
  isSelected = null,
  indentFile = "auto",
  onSelect = noop,
  isFolder = null,
  iconFolder = null,
  iconFolderOpened = null,
  iconFile = null,
  iconFileSelected = null,
}) {
  //
  const nodeValue = node.value();
  const { icon, label } = nodeValue;
  //
  return (
    <FilesystemEntryContent onClick={toggleOpen}>
      {/* icon.collapse */}
      {iconCollapse && (
        <strong
          style={{
            transform: `rotate(${isOpen ? "90deg" : 0})`,
          }}
          css={[styleIconCollapseContainer]}
        >
          {iconCollapse}
        </strong>
      )}
      {/* label */}
      <span
        onClick={onSelect}
        style={{
          paddingLeft: indentFile,
        }}
        css={[styleLabel, isFile && isSelected && styleLabelSelected]}
      >
        <span className="flex space-x-2 items-end">
          <strong>
            {isFile && (isSelected ? iconFileSelected : iconFile)}
            {isFolder && (isOpen ? iconFolderOpened : iconFolder)}
          </strong>
          <span css={[styleLabelText]}>{label}</span>
        </span>
      </span>
    </FilesystemEntryContent>
  );
}

function isEmpty(node) {
  return 0 === node.len();
}

function nodeKey_(node) {
  return (
    node &&
    node
      .path()
      .map((p) => p.value()["label"])
      .join("/")
  );
}
