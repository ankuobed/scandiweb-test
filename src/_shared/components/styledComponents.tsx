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
    position: 'absolute',
    top: 65,
    left: 0,
    height: '90vh',
    width: window.screen.width - 18,
    background: variant === 'transparent' ? 'transparent' : '#00000036',
}))