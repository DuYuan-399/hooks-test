import { renderHook, act } from '@testing-library/react';

import useToggle from '..';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  it('测试初始化没值的时候是否为false', () => {
    const hook = renderHook(() => useToggle());
    console.log(hook);
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('测试方法的使用', async () => {
    const hook = renderHook(() => useToggle('Hello'));
    expect(hook.result.current[0]).toBe('Hello');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe('Hello');
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('测试两个参数的使用', () => {
    const hook = renderHook(() => useToggle('Hello', 'World'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('World');
    act(() => {
      hook.result.current[1].set('World');
    });
    expect(hook.result.current[0]).toBe('World');
    callToggle(hook);
    expect(hook.result.current[0]).toBe('Hello');
  });
});
