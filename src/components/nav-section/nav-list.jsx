import PropTypes from 'prop-types';
import { memo, useState, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import NavItem from './nav-item';

function NavList({ data, depth, slotProps }) {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderNavItems = data.children?.map((list) => (
    <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
  ));

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={false}
        externalLink={false}
        onClick={handleToggle}
        slotProps={slotProps}
      />

      {!!data.children && (
        <Collapse in={open} unmountOnExit>
          {renderNavItems}
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};

export default memo(NavList);