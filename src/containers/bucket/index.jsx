// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../item-types';
import './bucket.css';

import NoteInBucket from '../note-in-bucket';

const Bucket = ({ connectDropTarget, isOver, notes, currentNote, bucketId }) => {

  const opacity = isOver ? 0.3 : 1;

  function renderNotes() {
    return notes.map((note, i) => {
      let styleName = '';
      if (currentNote[0] === bucketId && currentNote[1] === i)
        styleName = 'note-current';

      return (
        <NoteInBucket
          name={note.value}
          styleName={styleName}
          index={i}
          key={i}
          id={note.id}
          bucketId={bucketId}
        />
      );
    });
  }

  return connectDropTarget(
    <div className="bucket" style={{ opacity }}>
      {renderNotes()}
    </div>
  );
};

const bucketTarget = {
  drop(props, monitor) {
    if (monitor.didDrop() || props.notes.length > 0)
      return;
    return { target: 'bucket', bucketId: props.bucketId };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

function mapStateToProps({ tracks }) {
  return { tracks };
}

const dt_Bucket = DropTarget([ItemTypes.KEYBOARD_NOTE, ItemTypes.BUCKET_NOTE], bucketTarget, collect)(Bucket);

export default connect(mapStateToProps)(dt_Bucket);

// const Bucket = ({ notes, currentNote, bucketId }) => {

//   function renderNotes() {
//     return notes.map((note, i) => {
//       let styleName = '';
//       if (currentNote[0] === bucketId && currentNote[1] === i)
//         styleName = 'note-current';

//       return (
//         <NoteInBucket
//           name={note.value}
//           styleName={styleName}
//           index={i}
//           key={i}
//           id={note.id}
//           bucketId={bucketId}
//         />
//       );
//     });
//   }

//   return (
//     <div className="bucket">
//       {renderNotes()}
//     </div>
//   );
// };

// function mapStateToProps({ tracks }) {
//   return { tracks };
// }


// export default connect(mapStateToProps)(Bucket);
