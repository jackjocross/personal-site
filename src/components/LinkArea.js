import React from 'react';

const CLICK_THRESHOLD = 200;

export const LinkAreaContext = React.createContext(React.createRef());

export class LinkArea extends React.Component {
  static defaultProps = {
    className: '',
  };

  link = React.createRef();
  down = 0;
  up = 0;

  handleMouseDown = () => {
    this.down = +new Date();
  };

  handleMouseUp = event => {
    this.up = +new Date();
    if (
      this.link.current &&
      this.link.current !== event.target &&
      this.up - this.down < CLICK_THRESHOLD
    ) {
      this.link.current.click();
    }
  };

  render() {
    const { children, ...rest } = this.props;
    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        role="none"
        {...rest}
      >
        <LinkAreaContext.Provider value={this.link}>
          {children}
        </LinkAreaContext.Provider>
      </div>
    );
  }
}
