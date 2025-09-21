import PropTypes from 'prop-types';
import { memo, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Collapse from '@mui/material/Collapse';

import NavItem from './nav-item';

function NavList({ data, depth, slotProps }) {
  const location = useLocation();

  // Check if current route matches this nav item exactly
  const isExactMatch = location.pathname === data.path;

  // Check if any child is active
  const hasActiveChild = data.children && data.children.some(child =>
    location.pathname === child.path ||
    (child.path !== '#' && location.pathname.startsWith(child.path + '/'))
  );

  const [open, setOpen] = useState(hasActiveChild || false);

  // Highlight logic based on menu state:
  // - If menu is collapsed and has active child: highlight parent only
  // - If menu is expanded and has active child: highlight child only
  // - If exact match: always highlight
  const isActive = isExactMatch || (data.children && hasActiveChild && !open);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Update open state when route changes
  useEffect(() => {
    if (hasActiveChild) {
      setOpen(true);
    }
  }, [hasActiveChild]);

  const renderNavItems = data.children?.map((list) => (
    <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
  ));

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={isActive}
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