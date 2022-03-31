import styled from "styled-components";

export const NavItem = styled.a<{ active?: boolean }>(({ theme, active }) => ({
    color: active ? theme.PRIMARY : theme.SECONDARY,
    padding: 18,
    borderBottom: active ? `1px solid ${theme.PRIMARY}` : undefined,
    cursor: 'pointer'
}))