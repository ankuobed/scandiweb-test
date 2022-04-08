import { Component, createRef } from 'react'
import { DescriptionText } from './styledComponents'

export default class Description extends Component<{ html: string }> {
    divRef = createRef<HTMLParagraphElement>()

    componentDidMount() {
        if(this.divRef.current) {
            this.divRef.current.innerHTML = this.props.html
        }
    }

    render() {
        return (
            <DescriptionText ref={this.divRef} />
        )
    }
}
