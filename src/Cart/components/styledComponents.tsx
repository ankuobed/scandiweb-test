import { Link } from "react-router-dom"
import styled from "styled-components"
import cart from '../../assets/images/cart.svg'
import chevronLeft from '../../assets/images/chevron-left.svg'
import chevronRight from '../../assets/images/chevron-right.svg'
import { Flex } from "../../_shared"

export const CartIcon = styled(props => <img src={cart} alt="Cart" {...props} />)({
    width: 23
})

export const CartBadge = styled.div(({ theme }) => ({
    background: theme.SECONDARY,
    width: 10,
    height: 10,
    padding: 6,
    borderRadius: '50%',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
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

export const Price = styled.p<{ sm: boolean; }>(({ sm }) => ({
    fontWeight: 'bold',
    margin: 0,
    fontSize: sm ? 16 : 20
}))

export const Brand = styled.p<{ sm: boolean; }>(({ sm }) => ({
    margin: 0,
    marginBottom: 7,
    fontSize: sm ? 16 : 24,
    fontWeight: sm ? 'normal' : 'bold'
}))

export const Name = styled.p<{ sm: boolean; }>(({ sm }) => ({
    margin: 0,
    fontSize: sm ? 16 : 24
}))

export const Image = styled.img<{ sm: boolean; }>(({ sm }) => ({
    width: sm ? 100 : 140,
    height: sm ? 130 : 170,
    objectFit: 'contain'
}))

export const PreviousImageButton = styled(
    props => <img alt="previous" src={chevronLeft} {...props} />
)({
    width: 8.5,
    marginRight: -37,
    zIndex: 1,
    cursor: 'pointer',
    marginLeft: 15,
    padding: 8,
})

export const NextImageButton = styled(
    props => <img alt="previous" src={chevronRight} {...props} />
)({
    width: 8.5,
    marginLeft: -37,
    zIndex: 1,
    cursor: 'pointer',
    marginRight: 15,
    padding: 8
})

export const IncreaseButton = styled.img<{ sm: boolean; }>(({ sm }) => ({
    width: sm ? 25 : 32,
    height: sm ? 25 : 32,
    cursor: 'pointer'
}))

export const DecreaseButton = IncreaseButton

export const Quantity = styled.p<{ sm: boolean; }>(({ sm }) => ({
    fontWeight: 'bold',
    fontSize: sm ? 16 : 20
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

export const CartButtonWrapper = styled(Flex)({
    cursor: 'pointer'
})

export const CartItemSection = styled(Flex)<{ variant: 'default' | 'small'; }>(({ variant }) => ({
    minHeight: variant === 'default' ? 170 : 130
}))