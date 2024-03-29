import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../_shared";
import logo from '../../assets/images/logo.svg'


export const HeaderWrapper = styled(Flex)(({ theme }) => ({
    padding: 10,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.BACKGROUND,
    zIndex: 2,
}))

export const NavItem = styled(({ active, ...rest}) => 
<Link {...rest} />)<{ active: boolean }>(({ theme, active }) => ({
    color: active ? theme.PRIMARY : theme.SECONDARY,
    padding: 18,
    borderBottom: active ? `1px solid ${theme.PRIMARY}` : undefined,
    cursor: 'pointer',
    textDecoration: 'none'
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

export const CurrencySymbol = styled.span({
    fontSize: 19,
    marginRight: 5
})

export const CurrencySwitcherButtonWrapper = styled(Flex)({
    cursor: 'pointer'
})

export const Logo = styled(() => <img src={logo} alt="Logo"/>)({
    width: 32,
    height: 30
})

export const RightNav = styled(Flex)({
    width: 75
})