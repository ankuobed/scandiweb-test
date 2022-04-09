import { Component, createRef } from 'react'
import { DescriptionText } from './styledComponents'

export default class Description extends Component<{ html: string }> {
    ref = createRef<HTMLParagraphElement>()

    componentDidMount() {
        if(this.ref.current) {
            this.ref.current.innerHTML = this.props.html
        }
    }

    render() {
        return (
            <DescriptionText ref={this.ref} />
        )
    }
}
