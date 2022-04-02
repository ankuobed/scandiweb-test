import { Link } from "react-router-dom"
import styled from "styled-components"

export const ProductsWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 360px)',
    columnGap: 45,
    rowGap: 70
})

export const ProductItemWrapper = styled(Link)(({ theme }) => ({
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

export const AddToCartButtonRounded = styled.button(({ theme }) => ({
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

export const AddToCartButton = styled.button(({ theme }) => ({
    backgroundColor: theme.PRIMARY,
    width: 292,
    height: 52,
    border: 'none',
    cursor: 'pointer',
    color: '#ffffff',
    margin: '35px 0'
}))

export const AttributeItem = styled.button<{ active?: boolean }>(({ theme, active }) => ({
    backgroundColor: active ? theme.SECONDARY : '#ffffff',
    border: `1.5px solid ${theme.SECONDARY}`,
    color: active ? '#ffffff' : undefined,
    minWidth: 60,
    height: 42,
    cursor: 'pointer',
    marginRight: 12,
}))

export const AttributeColor = styled.button<{ active?: boolean; color: string }>(({ theme, active, color }) => ({
    backgroundColor: color,
    border: active ? '2.5px solid #5e5e5e' : `1.5px solid ${theme.SECONDARY}`,
    minWidth: 60,
    height: 42,
    cursor: 'pointer',
    marginRight: 12,
}))

export const Label = styled.p({
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 35
})

export const Description = styled.p({
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
    marginBottom: -15
})

export const Name = styled.p({
    fontSize: 30,
})

export const MainImage = styled.img({
    width: 500,
    maxHeight: 500
})

export const SubImages = styled.div({
    marginRight: 30
})

export const SubImage = styled.img({
    display: 'block',
    marginBottom: 30,
    width: 70,
    maxHeight: 100
})
