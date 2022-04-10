import { Link } from "react-router-dom"
import styled from "styled-components"
import cartImage from '../../assets/images/cart-white.svg'


export const ProductsWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 360px)',
    columnGap: 45,
    rowGap: 70,
    margin: '0 auto',
})

export const ProductItemWrapper = styled.div(({ theme }) => ({
    ':hover': {
        boxShadow: '1px 1px 30px #e0e0e0',
        'button': {
            display: 'flex'
        }
    },
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.SECONDARY
}))

export const ProductName = styled.p({
    marginBottom: 10,
    fontSize: 18
})

export const ProductPrice = styled.span({
    fontWeight: 'bold',
    fontSize: 18
})

export const AddToCartImage = styled(() => <img src={cartImage} alt="add to cart" />)({
    width: 24
})

export const AddToCartButtonRounded = styled(
    props => <button {...props}><AddToCartImage /></button>
)(({ theme }) => ({
    backgroundColor: theme.PRIMARY,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    width: 50,
    height: 50,
    borderRadius: '50%',
    position: 'relative',
    marginTop: -25,
    marginBottom: -25,
    right: 15,
    cursor: 'pointer',
}))

export const AddToCartButton = styled.button<{ disabled: boolean }>(({ theme, disabled }) => ({
    backgroundColor: theme.PRIMARY,
    width: 292,
    height: 52,
    border: 'none',
    cursor: disabled ? undefined : 'pointer',
    color: '#ffffff',
    margin: '35px 0'
}))

export const Label = styled.p({
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 35
})

export const DescriptionText = styled.p({
    fontFamily: 'Roboto',
    lineHeight: '160%'
})

export const Price = styled.p({
    fontWeight: 'bold',
    fontSize: 22,
    margin: 0,
})

export const Brand = styled.p({
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 0,
    marginBottom: -15
})

export const Name = styled.p({
    fontSize: 30,
})

export const MainImage = styled.img({
    width: 500,
})

export const SubImages = styled.div({
    marginRight: 30
})

export const SubImage = styled.img({
    display: 'block',
    marginBottom: 30,
    width: 70,
    maxHeight: 100,
    cursor: 'pointer',
})

export const ProductItemImage = styled.img({
    width: 330, 
    height: 335, 
    objectFit: 'contain'
})

export const BottomSection = styled(Link)(({ theme }) => ({
    textAlign: 'left', 
    width: '100%', 
    textDecoration: 'none',
    color: theme.SECONDARY
}))

export const ProductDetailsContent = styled.div({
    width: '40%'
})

export const ProductListWrapper = styled.div({
    marginTop: 70, 
    marginBottom: 100,
})

export const CategoryName = styled.p({
    fontSize: 42
})