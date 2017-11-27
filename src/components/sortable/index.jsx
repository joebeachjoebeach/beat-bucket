// SORTABLE

import React from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import './sortable.css';

class Sortable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sequence: [
        { value: 'A', id: 0 },
        { value: 'C', id: 1 },
        { value: 'D', id: 2 },
        { value: 'F', id: 3 },
        { value: 'E', id: 4 },
        { value: 'A', id: 5 }
      ]
    };
  }

  moveItem(origin, destination) {
    const newSeq = this.state.sequence.slice();
    newSeq.splice(destination, 0, newSeq.splice(origin, 1)[0]);
    this.setState({ sequence: newSeq });
    // console.log(newSeq);
  }

  renderItems() {
    return this.state.sequence.map(({ value, id }, i) => <Item_DTDS value={value} key={id} index={i} id={id} moveItem={this.moveItem.bind(this)} />);
  }

  render() {
    return (
      <div className="sortable">
        {this.renderItems()}
      </div>
    );     
  }
}

// const Item = ({ value, isDragging, connectDragSource, connectDropTarget }) => {
//   // const styleName = isDragging ? 'item gone' : 'item';
//   const styleName = 'item';
//   const opacity = isDragging ? 0 : 1;

//   if (isDragging)
//     console.log(value);


//   return connectDragSource(connectDropTarget(
//     <div className={styleName} style={{ opacity }}>
//       {value}
//     </div>
//   ));
// };

class Item extends React.Component {

  render() {
    const { value, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(<div className="item" style={{opacity}}>{value}</div>)
    );
  }
}

const itemSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.id
    };
  },

  isDragging(props, monitor) {
    if (props.id === monitor.getItem().id)
      return true;
    return false;
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;

  },
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

const Item_DTDS = flow([
  DragSource('item', itemSource, sourceCollect),
  DropTarget('item', itemTarget, targetCollect)
])(Item);


export default Sortable;
