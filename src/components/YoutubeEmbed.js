import React from 'react'
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
    <div className="w-full lg:px-4 py-4">
      <iframe
        className='w-full lg:h-96 h-56'
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
  
  YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
  };
  
  export default YoutubeEmbed;
