// Import libraries
import { useCallback, useState } from "react";
import FloatingButton from "@components/shared/FloatingButton";
import styled from "styled-components";

// Import components
import Drawer from "@components/shared/Drawer/Drawer";
import DrawerContent from "@components/shared/Drawer/DrawerContent";

// Import constants
import { LeftArrowIcon, RightArrowIcon } from "@components/shared/icons";
import { ROUTES } from "@constants/routes";

// Import components
import DrawerHeader from "@components/shared/Drawer/DashboardHeader";
import StyledLink from "@components/shared/StyledLink";

// Import hooks
import useClickOutside from "@hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "@hooks/redux";

// Import redux
import { toggleDrawerExpanded } from "@features/drawerReducer";

const DRAWER_WIDTH = 350;

const routesMap: { route: string; label: string }[] = [
  { label: "Builder", route: ROUTES.BUILDER.route },
  { label: "Execution Log", route: ROUTES.EXECUTION_LOG.route },
];

const StyledRoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DashboardDrawer = () => {
  const dispatch = useAppDispatch();

  const isDrawerExpanded = useAppSelector(
    (state) => state.drawer.isDrawerExpanded
  );

  const [ref, setRef] = useState<HTMLElement>();

  const toggleShowDrawer = () => {
    dispatch(toggleDrawerExpanded());
  };

  useClickOutside(ref, () => {
    // This is done ensure the toggling back does not happen instantenously
    // By right there should be a on transition complete on the drawer
    // There is no time thus I did it this way
    if (ref && ref.getBoundingClientRect().left >= 0 && isDrawerExpanded) {
      toggleShowDrawer();
    }
  });

  const renderLinks = useCallback(() => {
    const arr = routesMap.map(({ route, label }) => (
      <StyledLink key={route} to={route}>
        {label}
      </StyledLink>
    ));

    return <StyledRoutesContainer>{arr}</StyledRoutesContainer>;
  }, []);

  return (
    <div>
      <Drawer
        ref={(ref) => {
          if (ref) {
            setRef(ref);
          }
        }}
        $width={DRAWER_WIDTH}
        $isOpen={isDrawerExpanded}
      >
        <DrawerHeader>LOW CODE</DrawerHeader>
        <DrawerContent>{renderLinks()}</DrawerContent>
      </Drawer>
      <FloatingButton
        onClick={toggleShowDrawer}
        $left={isDrawerExpanded ? DRAWER_WIDTH : undefined}
        style={{ marginLeft: 20 }}
      >
        {isDrawerExpanded ? <LeftArrowIcon /> : <RightArrowIcon />}
      </FloatingButton>
    </div>
  );
};

export default DashboardDrawer;
