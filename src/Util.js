import { css } from 'react-emotion';

const Util = {
    override: css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: relative;
    `,
    overrideWithAbsolute: css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: absolute;
    left: 50%;
    `,
    BaseUrl: "https://swapi.co/api/"
}

export default Util;