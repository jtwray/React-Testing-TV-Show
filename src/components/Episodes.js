import React from "react";
import parse from "html-react-parser";

export default function Episodes(props) {
  if (!props.episodes||props.episodes===null) {
    return <h2>Fetching data...</h2>;
  }
  return (
    <div className="episodes">
      {props.episodes &&
        props.episodes.map((e) => (
          <div className="episode" key={e.id}>
            {e.image && (
              <img
                className="episode-image"
                src={e.image.medium}
                alt={e.name}
              />
            )}
            <div className="episode-info">
              <p className="episode-number">
                Season {e.season}, Episode {e.number}
              </p>
              <h3>{e.name}</h3>
              {e.summary && parse(e.summary)}
              <div className="flex-spacer" />
              <p className="episode-runtime">{e.runtime} minutes</p>
            </div>
          </div>
        ))}
    </div>
  );
}
