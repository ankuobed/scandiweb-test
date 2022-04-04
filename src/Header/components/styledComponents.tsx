import styled from "styled-components";

export const NavItem = styled.a<{ active?: boolean }>(({ theme, active }) => ({
    color: active ? theme.PRIMARY : theme.SECONDARY,
    padding: 18,
    borderBottom: active ? `1px solid ${theme.PRIMARY}` : undefined,
    cursor: 'pointer'
}))

export const CurrencySwitcherWrapper = styled.div({
    boxShadow: '1px 1px 25px #e4e4e4',
    background: '#ffffff',
    width: 100,
    float: 'right',
    position: 'relative',
    right: 100,
})

export const CurrencySwitcherItem = styled.div({
    ':hover': {
        backgroundColor: '#f1f1f1',
    },
    padding: '10px 20px',
    cursor: 'pointer',
})

export const ChevronDown = styled.img<{ up: boolean; }>(({ up }) => ({
    width: 10,
    transform: up ? 'rotate(180deg)' : undefined
}))