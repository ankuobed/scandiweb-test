import styled from 'styled-components';
import { IFlex } from '../types'

export const Flex = styled.div<IFlex>(
	({
		direction,
		align,
		self,
		flex,
		justify,
		flexWrap,
		mb,
		ml,
		mr,
		mt,
		mx,
		my,
		m,
		pb,
		pl,
		pr,
		pt,
		px,
		py,
		p,
	}) => ({
		display: 'flex',
		flexDirection: direction || 'row',
		flex,
		alignItems: align || 'center',
		justifyContent: justify,
		alignSelf: self,
		flexWrap,
		margin: m ? `${m}px` : `${my || 0}px ${mx || 0}px`,
		marginTop: `${mt}px`,
		marginBottom: `${mb}px`,
		marginLeft: `${ml}px`,
		marginRight: `${mr}px`,
		padding: p ? `${p}px` : `${py || 0}px ${px || 0}px`,
		paddingTop: `${pt}px`,
		paddingBottop: `${pb}px`,
		paddingLeft: `${pl}px`,
		paddingRight: `${pr}px`
	})
);

export const Overlay = styled.div<{ 
    variant?: 'translucent' | 'transparent'; 
    visible: boolean;
}>(({ variant, visible  }) => ({
    display: visible ? 'block' : 'none',
    position: 'fixed',
    top: 65,
    left: 0,
	right: 0,
	bottom: 0,
    background: variant === 'transparent' ? 'transparent' : '#00000036',
	overflowY: 'auto',
}))

export const AttributeItem = styled.button<{ selected?: boolean; sm: boolean; }>(({ theme, selected, sm }) => ({
    backgroundColor: selected ? sm ? '#00000022' : theme.SECONDARY : theme.BACKGROUND,
    border: `1.5px solid ${theme.SECONDARY}`,
    color: selected ? sm ? undefined : theme.BACKGROUND : undefined,
    minWidth: sm ? 24 : 60,
    height: sm ? 24 : 42,
    cursor: 'pointer',
    marginRight: 12,
	fontSize: sm ? 14 : 16,
}))

export const AttributeColor = styled.button<{ selected?: boolean; color: string; sm: boolean }>(({ theme, selected, color, sm }) => ({
    backgroundColor: color,
    border: selected ? '2.5px solid #5e5e5e' : `1.5px solid ${theme.SECONDARY}`,
    minWidth: sm ? 30 : 60,
    height: sm ? 24: 42,
    cursor: 'pointer',
    marginRight: 12,
	fontSize: sm ? 14 : 16,
	marginTop: sm ? 6 : undefined
}))

export const Label = styled.p({
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 35
})

export const Divider = styled.div<{ height?: number }>(({ height }) => ({
	width: '100%',
	backgroundColor: '#e6e6e6',
	height: 1,
	margin: `${height || 5}px 0`
}));