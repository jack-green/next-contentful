import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options = {};

const RichText = ({ document }) => documentToReactComponents(document, options);

export default RichText;
