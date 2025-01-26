// Import components
import Drawer from "@components/shared/Drawer/Drawer";
import DrawerContent from "@components/shared/Drawer/DrawerContent";
import FloatingButton from "@components/shared/FloatingButton";

// Import hooks
import useBoolean from "@hooks/useBoolean";

// Import constants
import { LeftArrowIcon, RightArrowIcon } from "@constants/icons";
import DrawerHeader from "@components/shared/Drawer/DashboardHeader";
import { useCallback } from "react";
import { ROUTES } from "@constants/routes";
import StyledLink from "@components/shared/StyledLink";
import styled from "styled-components";

const DRAWER_WIDTH = 300;

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
  const { toggle: toggleShowDrawer, value: showDrawer } = useBoolean(false);

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
      <Drawer $width={DRAWER_WIDTH} $isOpen={showDrawer}>
        <DrawerHeader>LOW CODE</DrawerHeader>
        <DrawerContent>{renderLinks()}</DrawerContent>
      </Drawer>
      <FloatingButton
        onClick={toggleShowDrawer}
        $left={showDrawer ? DRAWER_WIDTH : undefined}
        style={{ marginLeft: 20 }}
      >
        {showDrawer ? <LeftArrowIcon /> : <RightArrowIcon />}
      </FloatingButton>
    </div>
  );
};

export default DashboardDrawer;
