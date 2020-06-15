import React, { Component } from 'react';
import Sidebar from './Sidebar';

class SidebarWrapper extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className='ds-l-container'>
          <div className='ds-l-row'>
            <div className='sidebar ds-l-col--3'>
              <Sidebar />
            </div>
            <div className='main ds-l-col--9'>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarWrapper;
