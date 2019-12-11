import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// standard librrary
import { Table, Menu, Dropdown, Pagination } from 'antd';

// use library
import Utils from '@nexys/utils';

import Alert from '../../common/alert';
import Button from '../../common/button';
import Icon from '../../common/icon';
import Loader from '../../common/loader';
import Status from '../../common/status';
import Tooltip from '../../common/tooltip';

import Input from '../../form/input';
import Checkbox from '../../form/checkbox';

const DSUtils = Utils.ds;

export const mobileDisplayThreshold = 823;

export class List extends Component {
  constructor(props) {
    super(props);

    const {
      sorting,
      hiddenColumns,
      emptyColumns,
      pagination,
      values
    } = this.initialize(props);

    this.state = {
      List: this.setupWrappers(),
      searchValue: '',
      activeStatus: this.getInitStatus(props),
      mobileView: false,
      filterInfo: {},
      values,
      sorting,
      hiddenColumns,
      emptyColumns,
      pagination 
    };
  }

  componentDidMount() {
    this.addActionColumns(this.props);

    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const { values: prevValues } = this.props;
    const { values } = nextProps;
    if (values && !prevValues) this.setState({values});
    // TODO: reliable comparison: https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
    /// JSON.stringify comparison susceptible to changes in order
    if (values && prevValues && JSON.stringify(values) !== JSON.stringify(prevValues)) {
      this.setState({values});
    }
  }
  
  setupWrappers = List => {
    const { config } = this.props;

    if (!List) {
      List = config && config.simple ? SimpleTable : StandardTable;
    }

    //List = withOverflow(List);

    if (config) {
      //List = config.collapsible ? withCollapse(List) : List;
      const AddList = List // config.addRows ? entitySubscribe()(withAdd(List)) : List;
      const EditList = AddList // (!!config.edit && !config.addRows) ? entitySubscribe()(withEdit(List)) : AddList;
      return EditList;// config.selection ? withSelection(EditList) : EditList;
    } else return List;
  }

  initialize = props => {
    const { config, columns, values } = props;

    let sorting = null;
    // TODO: sort by default
    if (config && config.sorting) {
      const { order, orderBy } = config.sorting;
      sorting = {
        order: order || 'ascend',
        orderBy
      };
    }

    const hiddenColumns = columns.filter(({hidden}) => hidden).map(item => item.key);
    const emptyColumns = columns.filter(({emptyToggle, hidden}) => !hidden && emptyToggle).map(item => item.key);
    
    const pagination = this.getPagination(config, values);

    return {sorting, hiddenColumns, emptyColumns, pagination, values};
  }

  getInitStatus = props => {
    const { config } = props;

    const active = config.filters && config.filters.status && config.filters.status.active;
    return active || 'all';
  }

  getPagination = (config, values) => {
    let pagination = false;

    if (config && config.pagination && values) {
      const total = values.length;
      const pageSize = config.pagination.pageSize || 30;

      if (pageSize <= total) {
        const pageSizeOptions = config.pagination.sizeOptions || ['10', '30', '50'];
        const current = 1;
        const showTotal = (total, range) => `${range[0]}-${range[1]} of ${total} items`;

        pagination = {
          current, pageSize, pageSizeOptions,
          showSizeChanger: true, showQuickJumper: true,
          total, showTotal
        };
      }
    }

    return pagination;
  }

  handlePaginationChange = (current, pageSize) => this.setState(prevState => ({
    ...prevState,
    pagination: {
      ...prevState.pagination,
      current,
      pageSize
    }
  }));

  handleResize = () => {
    const { mobileView } = this.state;
    const width = window.innerWidth;

    if (width < mobileDisplayThreshold && !mobileView ) this.setState({ mobileView: true });
    else if ( width >= mobileDisplayThreshold && mobileView ) this.setState({ mobileView: false });
  }

  addActionColumns = props => {
    const { config, columns } = props;

    const { selection, view, delete: deleteAction, addRows } = config;

    if (config && !(selection && selection.apiCalls) && (view || config.delete || addRows)) {
      const actionColumn = {
        key: 'action',
        title: '',
        render: record => { 
          const id = record.uuid || record.id;
          if (id === 0) console.error('The id property of a list item cannot be 0!');
          // PREV: config.view && !config.edit
          return (
            <Fragment>
              {config.actions && config.actions(id, record)}
              {view && this.renderViewAction(view, id, record)}
              {deleteAction && id && this.renderDeleteAction(deleteAction, id, record)}
            </Fragment>
          );
        }
      };
      this.setState({columns: columns.concat([actionColumn])});
    } else {
      this.setState({columns});
    }
  }

  changeStatus = selectedStatus => this.setState({activeStatus: selectedStatus});

  handleSearch = ({name, value}) => this.setState({[name]: value});

  handleChange = (pagination, filters, sorting) => {
    const { config, onChange } = this.props;

    /*
    if (pagination) {
      const { pageSize, current } = pagination;
      this.setState(newState => ({
        ...newState,
        pagination: {
          ...newState.pagination,
          pageSize,
          current 
        }
      }));
    }
    */

    if (filters) this.setState({ filterInfo: filters });

    // TODO: handleChange/UI broken for sorting
    if (config.sorting && sorting) this.setState({sorting: {orderBy: sorting.columnKey, order: sorting.order}});

    if (onChange) onChange(pagination, filters, sorting);
  }

  renderViewAction = (viewFn, id, record) => {
    const uri = typeof viewFn === 'function' ? viewFn(id, record) : `${this.props.uriPrefix}/${id}/detail`;
    if (uri && uri.$$typeof) return uri;

    if (uri) return <Link to={uri}><Button shape="circle"><Icon name="eye"/></Button></Link>;
    else return null;
  };

  handleUpdate = id => data => this.setState(prevState => ({
    values: prevState.values.map(item => {
      if (item.id === id || item.uuid === id) return data;
      else return item;
    })
  }));

  handleDelete = id => () => this.setState(prevState => ({
    values: prevState.values.filter(item => !(item.uuid === id || item.id === id))
  }));

  renderDeleteAction = (deleteFn, id, r) => {
    // only display if delete request function is provided
    if (typeof deleteFn === 'function') {
      //const request = deleteFn(id, r);
      // const { onSuccess, reload } = this.props;

      return null;

      /*(
        <Deletion
          {...this.props}
          request={request}
          onSuccess={this.handleDelete(id)} // {onSuccess || reload}
          small
        />
      );*/
    }

    return null;
  };

  renderList = () => {
    //const { config } = this.props;
    //const { mobileView, columns } = this.state;
    const { List } = this.state;

    return List;
  }

  renderSearch = () => {
    const { config, translate } = this.props;
    const { searchValue } = this.state;

    if (config.filters.search) {
      return (
        <Col contentRight>
          <SearchWrapper>
            <Input
              name="searchValue"
              value={searchValue}
              onChange={this.handleSearch}
              placeholder={translate('search')}
              endAdornment={<Icon name="search" />}
              clearable
            />
          </SearchWrapper>
        </Col>
      );
    }

    return null;
  }

  renderStatus = () => {
    const { translate, values, config } = this.props;
    const { activeStatus } = this.state;

    if (config.filters.status && config.filters.status.list && values) {
      const statusList = ['all'].concat(config.filters.status.list).map((status, idx) => {
        const myClass = activeStatus === status ? ' active' : '';
        const numWithStatus = status === 'all' ? values.length : values.filter(item => item.status.name === status).length;
        const number = values ? `(${numWithStatus})` : '';
        return (
          <Status key={`status-${idx}`} onClick={() => this.changeStatus(status)} className={myClass}>
            {translate(status)} {number}
          </Status>
        );
      });

      return <Col><div style={{display: 'flex'}}>{statusList}</div></Col>;
    }

    return null;
  }

  handleColumnCheckbox = ({name, value}) => {
    const { hiddenColumns: prevHiddenColumns } = this.state;

    let hiddenColumns = [];
    if (!value) hiddenColumns = prevHiddenColumns.concat([name]);
    else hiddenColumns = prevHiddenColumns.filter(item => item !== name);

    this.setState({hiddenColumns});
  }

  handleEmptyCheckbox = ({name, value}) => {
    const { emptyColumns: prevEmptyColumns } = this.state;

    let emptyColumns = [];
    if (value) emptyColumns = prevEmptyColumns.concat([name]);
    else emptyColumns = prevEmptyColumns.filter(item => item !== name);

    this.setState({emptyColumns});
  }

  renderColumnSelection = () => {
    const { columns, hiddenColumns } = this.state;

    const menu = (
      <Menu>
        {columns.filter(({key}) => key !== 'action').map((col, i) => (
          <Menu.Item key={`menu-${i}`}>
            <Checkbox
              key={`col-${i}`}
              name={col.key}
              value={!hiddenColumns.includes(col.key)}
              onChange={this.handleColumnCheckbox}
            />
            <span style={{marginLeft: 10}}>{col.title}</span>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Dropdown overlay={menu} trigger="click" placement="bottomLeft">
          <Button><Icon name="switcher" />&nbsp;Toggle columns</Button>
        </Dropdown>
      </div>
    );
  }

  onRow = ({entity, props, action}) => record => ({ 
    onClick: e => {
      // TODO: some clicks are triggered on the wrong/highlighted element
      let n = e.target;

      // NOTE: iterate until tag is tr
      for (; n ; n = n.parentNode) {
        if (n.tagName === 'TR') break;
      }

      if (!Number(n.dataset.highlighted)) {
        // NOTE: highlight selected row
        n.style.backgroundColor = 'rgba(213, 242, 255, 0.4)';
        n.dataset.highlighted = 1;

        // NOTE: de-select other rows
        const siblings = [...n.parentNode.children].filter(c => c !== n);
        siblings.forEach(sibling => {
          sibling.style.backgroundColor = null;
          n.highlighted = 0;
        });

        // TODO: improve robustness of action
        for (let prop of props) {
          const value = DSUtils.get(prop, record);
          let name = `${entity}.${prop}`;
          name = entity ? name : prop; 
          // TODO: { attribute: value }].reduce
          console.log(name, value);
          action(name, value); 
        }
      } else {
        n.style.backgroundColor = null;
        n.dataset.highlighted = 0;
        action(entity, null); 
      }
    }
  })

  draggableComponents = {
    body: {
      //row: DraggableRow
    }
  }

  moveRow = filteredValues => (dragFIdx, hoverFIdx) => {
    const { values } = this.state;

    const dragId = filteredValues[dragFIdx].id;
    const dragIdx = values.findIndex(e => e.id === dragId);
    const hoverId = filteredValues[hoverFIdx].id;
    const hoverIdx = values.findIndex(e => e.id === hoverId);

    const dragRow = values[dragIdx];

    values.splice(dragIdx, 1);
    values.splice(hoverIdx, 0, dragRow);

    this.setState({values});
  }

  getRowHandler = (config, filteredValues) => {
    //let draggable = {};

    /*if (config.draggable) {
      draggable = {
        moveRow: this.moveRow(filteredValues)
      };
    }*/

    return (record, index) => ({
      index,
      //...draggable
    });
  }

  render() {
    const { translate, config, entities } = this.props;
    const { searchValue, activeStatus, filterInfo, sorting, columns: allColumns, hiddenColumns, emptyColumns, pagination, mobileView } = this.state;
    let { columns, values } = this.state;

    // TODO: translate labels
    if (!columns || !values) {
      return <Loader />;
    }

    // NOTE: filter out hidden columns 
    if (config.columnSelection) {
      columns = columns.filter(col => !hiddenColumns.includes(col.key));
    }

    if (config.emptyToggle) {
      columns = columns.map((col, i) => {
        if (col.emptyToggle) {
          const title = (
            <Fragment>
              {col.title}
              <span style={{marginLeft: 10}}>
                <Tooltip text={translate('column.showEmpty')} />
                <span style={{marginLeft: 5}}>
                  <Checkbox
                    key={`toggle-empty-col-${i}`}
                    name={col.key}
                    value={emptyColumns.includes(col.key)}
                    onChange={this.handleEmptyCheckbox}
                  />
                </span>
              </span>
            </Fragment>
          );
          return {...col, title};
        } else return col;
      })
    }

    // NOTE: set the filteredValue on the respective columns
    if (filterInfo) columns.forEach(c => filterInfo[c.key] ? c.filteredValue = filterInfo[c.key] : c);

    if (values.length === 0 && (config && !config.addRows)) {
      return <Alert color="info">{translate('noNumRow')}</Alert>;
    }

    if (values.error) {
      return <Alert color="danger">{values.error}</Alert>;
    }

    if (!Array.isArray(values)) {
      return <Alert color="danger">{JSON.stringify(values)}</Alert>;
    }

    let filteredValues = values.map((item, idx) => ({key: idx+1, ...item}));

    if (config.sorting && sorting) {
      const { order, orderBy } = sorting;
      filteredValues = DSUtils.sortByProp(filteredValues, orderBy, order === 'ascend'); 
    } else {
      columns = columns.map(c => DSUtils.removeProp(c, 'sorter'));
    }

    // NOTE: filtering
    if (values) {
      if (emptyColumns.length > 0) {
        // NOTE: keep only empty values
        const filterEmptyColumns = emptyColumns.filter(v => !hiddenColumns.includes(v));
        filteredValues = filteredValues.filter(v => filterEmptyColumns.reduce((a, c) => a && !DSUtils.get(c, v), true));
      }

      if (config) {
        if (config.filters && config.filters.search) {
          const search = config.filters.search;
          let minSearchLength = search && search.min ? search.min : 3;

          if (searchValue.length >= minSearchLength) {
            const searchProps = columns.filter(({search}) => search).map(({key}) => key);

            // PREV: filteredValues = filteredValues.filter(x => Utils.filterRow(searchValue, x, searchProps));
            filteredValues = filteredValues.filter(item => searchProps.some(nameItem => {
              let accessedValue = DSUtils.get(nameItem, item);
              accessedValue = isNaN(accessedValue) ? accessedValue.toLowerCase() : String(accessedValue);
              if (accessedValue) return accessedValue.includes(searchValue.toLowerCase());
              else return false;
            }));
          }
        }

        if (config.filters && config.filters.status && config.filters.status.list && activeStatus !== 'all') {
          filteredValues = filteredValues.filter(item => item.status.name === activeStatus);
        }

        // NOTE: get all columns for which a filter is set
        const filterColumns = columns.filter(c => c.filteredValue && c.filteredValue !== null && c.filteredValue.length !== 0);
        // NOTE: keep values that conform to all set filters
        if (filterColumns.length > 0) {
          filteredValues = values.filter(v => filterColumns.reduce((a,c) => a && c.onFilter(c.filteredValue, v), true));
        }

        if (config.filters && config.filters.page) {
          const linearizedKeys = DSUtils.getLinearizedKeys(config.filters.page);
          filteredValues = filteredValues.filter(item => {
            let keep = true;
            for(const keyy of linearizedKeys) {
              const value = DSUtils.get(keyy, config.filters.page);
              if (value) keep = keep && DSUtils.get(keyy, item) === value;
            }
            return keep;
          });
        }
      }
    }

    if (pagination) {
      const { current, pageSize } = pagination;
      // NOTE: adapt current and total to filters on the fly
      if (filteredValues.length < pagination.total) {
        pagination.current = 1;
      }
      pagination.total = filteredValues.length;

      filteredValues = filteredValues.slice((current-1) * pageSize, current * pageSize);
    }

    let List = this.renderList();

    let additionalProps = {};    
    /*if (config && config.draggable) {
      List = DragDropContext(HTML5Backend)(this.renderList());
      additionalProps = { components: this.draggableComponents };
    }*/

    let rowSelection = false;
    if (config.selectable) {
      rowSelection = {
        onSelect: (record, selected, selectedRows, e) => {
          const {entity, props, action} = config.selectable;

          // TODO: deselection code for all over rows
          if (selected) {
            for (let prop of props) {
              const value = DSUtils.get(prop, record);
              let name = `${entity}.${prop}`;
              name = entity ? name : prop; 
              // TODO: { attribute: value }].reduce
              console.log(name, value);
              action(name, value); 
            }
          } else action(entity, null);

          /*
            // NOTE: previous code with styles instead of radio buttons

            // TODO: some clicks are triggered on the wrong/highlighted element
            let n = e.target;

            // NOTE: iterate until tag is tr
            for (; n ; n = n.parentNode) {
              if (n.tagName == 'TR') break;
            }

            if (!Number(n.dataset.highlighted)) {
              // NOTE: highlight selected row
              n.style.backgroundColor = 'rgba(213, 242, 255, 0.4)';
              n.dataset.highlighted = 1;

              // NOTE: de-select other rows
              const siblings = [...n.parentNode.children].filter(c => c != n);
              siblings.forEach(sibling => {
                sibling.style.backgroundColor = null;
                n.highlighted = 0;
              });

              // TODO: improve robustness of action
              for (let prop of props) {
                const value = DSUtils.get(prop, record);
                let name = `${entity}.${prop}`;
                name = entity ? name : prop; 
                // TODO: { attribute: value }].reduce
                console.log(name, value);
                action(name, value); 
              }
            } else {
              n.style.backgroundColor = null;
              n.dataset.highlighted = 0;
              action(entity, null); 
            }
          */
        },
        hideDefaultSelections: true,  
        type: 'radio'
      };
    }

    // TODO: override cell: https://github.com/react-component/table/pull/171
    // when row is editable, remove overflow: hidden
    // use for getColumnsWithTooltip

    // NOTE: if rowKey="id" -> .key is not used 
    return (
      <Fragment>
        {config && config.extra && (
          <Row className={(config && config.filters) ? "top-30" : ''}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>{config.extra}</div>
          </Row>
        )}
        {config && config.filters && (
          <Row className={(!config.noMargins && !config.extra) ? "top-30" : ''}>
            {this.renderStatus()}
            {this.renderSearch()}
          </Row>
        )}
        {/*{config && config.aggregates && withAggregation(columns, filteredValues)}*/}
        {config && config.columnSelection && <Row>{this.renderColumnSelection()}</Row>}
        <List
          {...this.props}
          {...additionalProps}
          rowSelection={rowSelection && rowSelection}
          columns={columns}
          allColumns={allColumns}
          entities={entities || (config && config.entities)}
          pagination={false}
          dataSource={filteredValues}
          onChange={this.handleChange}
          handleUpdate={this.handleUpdate}
          onRow={this.getRowHandler(config, filteredValues)}
          showHeader={!(config && config.hideHeader)}
        />
        {pagination && !mobileView && (
          <PaginationWrapper>
            <Pagination
              {...pagination}
              onChange={this.handlePaginationChange}
              onShowSizeChange={this.handlePaginationChange}
            />
          </PaginationWrapper>
        )}
      </Fragment>
    );
  }
}

List.propTypes = {
  /** array of object that is to be displayed in list: [{}, {}, {}, ...] */
  values: PropTypes.array.isRequired,
  /** array of column definition: {title, render} */
  columns: PropTypes.array.isRequired,
  config: PropTypes.object
};

// TODO: create wrapper
export default List; // withRouter(withConnection(withNotification(withI18n(List))));

export const Standalone = props => <List {...props} translate={key => key} />;


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  ${props => !props.simple && `
    padding: 15px 0;
    margin: 0 -15px;

    & > * { margin: 0 15px; flex-grow: 1; }
  `}

  &:empty {
    padding: 0;
  }
`;

const Col = styled.div`
  ${props => props.contentRight && `
    display: flex;
    justify-content: flex-end;
  `}

  @media (max-width: 768px) {
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  &:last-child {
    padding: 0;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  width: 350px;

  @media (max-width: 425px) {
    width: 100%;
  }
`

const StandardTable = styled(Table)`
  thead.ant-table-thead {
    tr {
      th {
        vertical-align: top;
        white-space: nowrap;
        border-bottom: 2px solid #f4f4f4;
        // background-color: #fbfbfb;
        padding: 15px;
        color: #666;

        &:hover {
          background-color: #fafafa !important;
        }
      }
    }
  }

  tbody.ant-table-tbody {
    tr {
      td {
        border-bottom: 2px solid #f7f7f7;
        padding: 10px 15px !important;

        button {
          margin: 0 2px;
        }

        .ant-form-item {
          margin: 0;
          .ant-form-item-control {
            line-height: normal !important;
            .ant-input {
              height: auto;
              padding: 4px 6px;
            }
          }
        }

        &:last-child {
          // display: flex;
          // justify-content: flex-end;
          vertical-align: top;
        }
      }

      &:last-child {
        td {
          border-bottom: none !important;
        }
      }
    }
  }
`

// TODO: https://tvkhoa.github.io/testlib/
// use react-tippy
const SimpleTable = styled(Table)`
  table {
    ${props => props.config && !props.config.fluid && `
      table-layout: fixed;
    `}

    thead.ant-table-thead {
      tr {
        border-bottom: 2px solid #f5f5f5;

        th {
          padding: 10px;
          border: none;
          background-color: #fff;
          vertical-align: top;
          white-space: nowrap;
        }
      }
    }

    tbody.ant-table-tbody {
      tr {
        border-bottom: 1px solid #f5f5f5;

        /*
        ${props => props.config && props.config.selectable && `
          // TODO: hover effects: https://codepen.io/giana/pen/BZaGyP
          // cursor: pointer;
          border-bottom: none;

          &:hover {
            transform: translateY(-.1em);
          }

          // TODO: tr backgroundColor hides box-shadow 
          box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.075);
        `}
        */

        td {
          div {
            ${props => !(props.config && props.config.addRows) && `overflow: hidden;` }
            text-overflow: ellipsis;
            ${props => !(props.config && props.config.fluid) && `white-space: nowrap;`}
          }

          padding: 5px 10px;
          border: none;

          button {
            margin: 0 2px;
          }

          .ant-form-item {
            margin: 0;
            .ant-form-item-control {
              line-height: normal !important;
              .ant-input {
                height: auto;
                padding: 4px 6px;
              }
            }
          }

          &:last-child {
            width: 100px;
            vertical-align: top;
          }
        }
      }
    }
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`;