export const LayoutComponent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className='layout-container'>
      <div className='star-container'>
        <div className='star-small' />
        <div className='star-medium' />
        <div className='star-large' />
      </div>
      {children}
    </div>
  );
};
