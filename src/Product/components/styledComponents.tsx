import styled from "styled-components"

export const ProductsWrapper = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 360px)',
    columnGap: 45,
    rowGap: 70
})

export const ProductItemWrapper = styled.div({
    ':hover': {
        boxShadow: '1px 1px 30px #e0e0e0'
    },
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
})

export const ProductName = styled.p({
    marginBottom: 10,
    fontSize: 18
})

export const ProductPrice = styled.span({
    fontWeight: 'bold',
    fontSize: 18
})