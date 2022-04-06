import { Component } from 'react'
import { OverlayWrapper } from './styledComponents';
import ReactDOM from 'react-dom'

interface Props { 
    variant?: 'translucent' | 'transparent'; 
    visible: boolean;
    onClick: () => void;
}

const overlayRoot = document.getElementById('overlay-root')

export class Overlay extends Component<Props> {
    el: HTMLDivElement

    constructor(props) {
        super(props)
        this.el = document.createElement('div')
    }

    componentDidMount() {
        overlayRoot?.appendChild(this.el)
    }
    
    componentWillUnmount() {
        overlayRoot?.removeChild(this.el)
    }
    
    render() {
        return ReactDOM.createPortal(
            <OverlayWrapper {...this.props}>
                {this.props.children}
            </OverlayWrapper>,
            this.el
        )
    }
}
