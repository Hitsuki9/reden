import React, { KeyboardEvent, FC, ChangeEvent, FocusEvent } from 'react';
import classNames from 'classnames';
import { noop } from '@/utils';
import CommonClass from '@style/constant';
import style from './Input.less';

interface InputProps {
  content: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => any;
  placeholder?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
}

const Input: FC<InputProps> = (props) => {
  const {
    content,
    onChange: changeHandler,
    onKeyDown: keyDownHandler = noop,
    onFocus: focusHandler = noop,
    placeholder = '',
    prefix = null,
    suffix = null
  } = props;

  return (
    <div
      className={classNames(style.input, CommonClass.Unselectable)}
    >
      {prefix}
      <input
        placeholder={placeholder}
        className={classNames(style.innerInput, CommonClass.InnerInput)}
        value={content}
        onKeyDown={keyDownHandler}
        onChange={changeHandler}
        onFocus={focusHandler}
        type="text"
      />
      {suffix}
    </div>
  );
};

export default Input;
