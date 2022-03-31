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