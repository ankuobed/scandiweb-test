import { Link } from "react-router-dom"
import styled from "styled-components"
import cart from '../../assets/images/cart.svg'


export const CartIcon = styled(props => <img src={cart} alt="Cart" {...props} />)({
    width: 23
})

export const CartBadge = styled.div(({ theme }) => ({
    background: theme.SECONDARY,
    width: 18,
    height: 17,
    borderRadius: '50%',
    color: '#ffffff',
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -18,
    position: 'relative',
    right: 7,
    bottom: 7,
    fontFamily: 'Roboto'
}))

export const CartDialogWrapper = styled.div({
    background: '#ffffff',
    width: 325,
    float: 'right',
    position: 'relative',
    right: 70,
    padding: 16,
})

export const Price = styled.p({
    fontWeight: 'bold',
    margin: 0,
})

export const Brand = styled.p({
    margin: 0,
    marginBottom: 7
})

export const Name = styled.p({
    margin: 0
})

export const Image = styled.img({
    width: 100,
    height: 130
})

export const IncreaseButton = styled.img(({ theme }) => ({
    width: 25,
    height: 25,
    cursor: 'pointer'
}))

export const DecreaseButton = IncreaseButton

export const Quantity = styled.p({
    fontWeight: 'bold'
})

export const AttributeItem = styled.button<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? '#00000022' : '#ffffff',
    border: `1.5px solid ${theme.SECONDARY}`,
    minWidth: 24,
    height: 24,
    cursor: 'pointer',
    marginRight: 12,
    fontSize: 14,
    marginBottom: 6
}))

export const AttributeColor = styled.button<{ active?: boolean; color: string }>(({ theme, active, color }) => ({
    backgroundColor: color,
    border: active ? '2.5px solid #5e5e5e' : `1.5px solid ${theme.SECONDARY}`,
    minWidth: 30,
    height: 24,
    cursor: 'pointer',
    marginRight: 12,
    marginBottom: 6
}))

export const ViewBagButton = styled(Link)(({ theme }) => ({
    fontSize: 14,
    border: `1px solid ${theme.SECONDARY}`,
    height: 42,
    color: theme.SECONDARY,
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    fontWeight: 600,
    ':hover': {
        backgroundColor: '#00000024'
    }
}))

export const CheckoutButton = styled.button(({ theme }) => ({
    width: '45%',
    height: 42,
    border: 'none',
    fontWeight: 600,
    backgroundColor: theme.PRIMARY,
    color: theme.BACKGROUND,
    cursor: 'pointer',
    ':hover': {
        backgroundColor: '#4eac67'
    }
}))