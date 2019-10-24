/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, AutoComplete } from 'antd';
import classNames from 'classnames';
// import Debounce from 'lodash-decorators/debounce';
// import Bind from 'lodash-decorators/bind';

import styles from './index.module.scss';

export default class HeaderSearch extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.array,
    defaultActiveFirstOption: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    onPressEnter: PropTypes.func,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
  }

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次

  render() {
    const { className, placeholder, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <a
        className={ classNames(className, styles.headerSearch) }
        onClick={ this.enterSearchMode }
        role='button'>
        <Icon key='Icon' type='search' />
        <AutoComplete
          key='AutoComplete'
          { ...restProps }
          className={ inputClass }
          onChange={ this.onChange }
          value={ value }>
          <Input
            onBlur={ this.leaveSearchMode }
            onKeyDown={ this.onKeyDown }
            placeholder={ placeholder }
            ref={ node => {
              this.input = node;
            } }/>
        </AutoComplete>
      </a>
    );
  }
  onChange = value => {
    this.setState({ value });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.debouncePressEnter();
    }
  }
  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  }
  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.input.focus();
      }
    });
  }
  // @Bind()
  // @Debounce(500, {
  //   leading: true,
  //   trailing: false,
  // })
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }
}
