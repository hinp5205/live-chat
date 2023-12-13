import {
  PropsWithChildren,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PopoverProps extends PropsWithChildren {
  showArrow?: boolean;
  triggerNode: React.ReactElement;
  trigger: 'click' | 'hover';
  closeOnClick?: boolean;
  onClose?: () => void;
  onOutSide?: () => void;
}

interface PopoverContentProps extends PropsWithChildren {
  showArrow: boolean;
  closeOnClick?: boolean;
  onClickOutSide?: () => void;
  onClose?: () => void;
}

function PopoverContent({
  showArrow,
  children,
  closeOnClick,
  onClose,
  onClickOutSide,
}: PopoverContentProps) {
  const ref = useRef<HTMLDivElement>();

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      onClose();
    }
  }

  function handleClickOutSide(e: any) {
    if (ref.current) {
      if (closeOnClick) {
        onClose();
      } else {
        if (!ref.current.contains(e.target)) {
          onClickOutSide();
        }
      }
    }
  }

  useEffect(() => {
    ref.current?.focus();
    document.addEventListener('click', handleClickOutSide, false);

    return () => {
      ref.current?.blur();
      document.removeEventListener('click', handleClickOutSide, false);
    };
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className='popover-content'
    >
      <div className='popover-inner'>{children}</div>
    </div>
  );
}

function PopoverComponent({
  triggerNode,
  trigger,
  closeOnClick,
  showArrow,
  children,
  onOutSide,
}: PopoverProps) {
  const [isVisible, setVisible] = useState<boolean>(false);

  function onShow(e: React.MouseEvent) {
    e.stopPropagation();
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  function onToggle(e: React.MouseEvent) {
    e.stopPropagation();
    setVisible(!isVisible);
  }

  function onClickOutSide() {
    onClose();
    onOutSide && onOutSide();
  }

  return (
    <div className='popover'>
      {triggerNode &&
        cloneElement(triggerNode, {
          onClick: trigger === 'click' || trigger === 'hover' ? onToggle : null,
          onMouseOver: trigger === 'hover' ? onShow : null,
        })}

      {isVisible && (
        <PopoverContent
          showArrow={showArrow}
          closeOnClick={closeOnClick}
          onClickOutSide={onClickOutSide}
          onClose={onClose}
        >
          {children}
        </PopoverContent>
      )}
    </div>
  );
}

export default PopoverComponent;
