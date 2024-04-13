
'use client';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      progress: this.props.progress,
      input1: '',
      sum: '',
    };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  submit = (e) => {
    if (e.key === 'Enter') {
      this.setState({ progress: this.state.sum, showModal: false });
      this.props.onSave();
    }
  }

  save = () => {
    this.setState({ progress: this.state.sum, showModal: false });
    this.props.onSave();
  }

  open = () => {
    this.setState({ showModal: true, sum: this.props.progress, input1: '' });
  }

  handleChange = (name, e) => {
    this.setState({ [name]: e.target.value, sum: Number(this.props.progress) + Number(e.target.value) });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open} className="button">
          Add funds
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Funds for {this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Current progress:</label>
            <div className="data">${this.props.progress.toLocaleString()}</div>
            <label>Add amount:</label>
            <div className="data">
              <span className="pre-money">$</span> <input type="number" className="fund-container" defaultValue="" onKeyPress={this.submit} onChange={(e) => this.handleChange('input1', e)} autoFocus />
            </div>
            <p className="smallprint">Total Progress: <span className="pre-money">${this.state.sum.toLocaleString()}</span></p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button type="button" className="btn-primary" onClick={this.save}>
              Update Progress
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class Pie extends Component {
  render() {
    const { color, width, progress } = this.props;
    const pi = 3.14159265359;
    const r = 400 / 2;
    const c = 2 * pi * r;
    const realProgress = c * progress;
    return (
      <div className="svg-container">
        <div className="svg-content">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <filter id="shadow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
              <feOffset dx="-5" dy="-4" />
            </filter>
            <circle
              className="animated"
              cx="250"
              cy="250"
              r="200"
              stroke=""
              fillOpacity="0"
              strokeWidth={width + 10}
              strokeDasharray={[realProgress, c]}
              strokeDashoffset={c * progress}
            />
            <circle
              filter="url(#shadow)"
              className="animated shadow"
              cx="250"
              cy="250"
              r="200"
              stroke={color}
              fillOpacity="0"
              strokeWidth={width}
              strokeDasharray={[realProgress, c]}
              strokeDashoffset={c * progress}
            />
            <circle
              className="animated fill"
              cx="250"
              cy="250"
              r="200"
              stroke={color}
              fillOpacity="0"
              strokeWidth={width}
              strokeDasharray={[realProgress, c]}
              strokeDashoffset={c * progress}
            />
            <circle
              cx="250"
              cy="250"
              r="200"
              stroke={color}
              fillOpacity="0"
              strokeWidth="5"
              strokeDasharray={[c, c]}
              strokeOpacity="0.1"
            />
          </svg>
        </div>
      </div>
    );
  }
}

class GoalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      progress: this.props.item.progress,
      input1: this.props.item.name,
      input2: this.props.item.amount,
      input3: this.props.item.progress,
      selectValue: this.props.item.category,
    };
  }

  addMoney() {
    var addFunds = prompt('Add funds for: ' + this.props.item.name, '0');
    this.props.item.progress += Number(addFunds);
    this.setState({ item: this.props.item });
  }

  onSave() {
    this.props.item.progress = progressUpdate;
    this.setState({ item: this.props.item });
  }

  editGoal(index) {
    this.props.onFlip(index);
    this.setState({
      condition: !this.state.condition,
      input1: this.props.item.name,
      input2: this.props.item.amount,
      input3: this.props.item.progress,
      selectValue: this.props.item.category,
    });
  }

  deleteGoal(index) {
    this.props.onDelete(index);
    this.setState({
      condition: !this.state.condition,
      input1: this.props.item.name,
      input2: this.props.item.amount,
      input3: this.props.item.progress,
      selectValue: this.props.item.category,
      flipped: false,
      dragStatus: true,
    });
  }

  cancelEdit(index) {
    this.props.onFlip(index);
    this.setState({
      condition: !this.state.condition,
      input1: this.props.item.name,
      input2: this.props.item.amount,
      input3: this.props.item.progress,
      selectValue: this.props.item.category,
    });
  }

  saveGoal(index) {
    this.props.onFlip(index);
    this.setState({ condition: !this.state.condition });
    this.props.item.name = this.state.input1;
    this.props.item.amount = Number(this.state.input2);
    this.props.item.progress = Number(this.state.input3);
    this.props.item.category = this.state.selectValue;
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleDropdown(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    var message;
    var strokeColor;
    var status;
    var remaining;
    var percentRemaining;
    if (this.props.item.progress / this.props.item.amount < 1) {
      strokeColor = '#01579B';
      status = 'Remaining';
      remaining = (this.props.item.amount - this.props.item.progress).toLocaleString();
      percentRemaining = '(' + ((this.props.item.amount - this.props.item.progress) / this.props.item.amount * 100).toFixed(0) + '%)';
    } else {
      strokeColor = '#7dbf69';
      status = 'Exceeded';
      remaining = Math.abs(this.props.item.amount - this.props.item.progress).toLocaleString();
      percentRemaining = '(' + Math.abs((this.props.item.amount - this.props.item.progress) / this.props.item.amount * 100).toFixed(0) + '%)';
    }

    return (
      <div className={this.state.condition ? 'flipped card-container' : 'card-container'}>
        <figure className="front">
          <div className="goal--top">
            <a href="#" className="edit" onClick={this.editGoal.bind(this, this.props.item.index)}>
              <i className="fa fa-pencil-square-o"></i>
            </a>
            <div className="goal__name">{this.props.item.name}</div>
            <Pie color={strokeColor} width={15} progress={this.props.item.progress / this.props.item.amount} />
            <div className="goal--top__container">
              <i className={'category fa fa-' + this.props.item.category} aria-hidden="true"></i>
              <div className="goal--progress">
                <span className="money">{this.props.item.progress.toLocaleString()}</span>
              </div>
              <div className="goal--amount">of <span className="money">{this.props.item.amount.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="goal--bottom">
            <div className="descriptor">{status}<span className="money right goal--remain">{remaining}</span><span className="percent right">{percentRemaining}</span></div>
            <Example name={this.props.item.name} progress={this.props.item.progress} amount={this.props.item.amount} onSave={this.onSave.bind(this)} />
          </div>
        </figure>
        <figure className="back">
          <a href="#" className="back-arrow" onClick={this.cancelEdit.bind(this, this.props.item.index)}>
            <i className="fa fa-angle-left"></i>
          </a>
          <h3 className="card-title">Goal Details</h3>
          <div className="input-container">
            <label name="name" className="descriptor">Name</label>
            <input type="text" placeholder="Goal Name" value={this.state.input1} onChange={this.handleChange.bind(this, 'input1')} />
            <label name="amount" className="descriptor">Goal</label>
            <span className="edit-money">$</span> <input type="number" placeholder="Amount" value={this.state.input2} onChange={this.handleChange.bind(this, 'input2')} />
            <label name="progress" className="descriptor">Progress</label>
            <span className="edit-money">$</span> <input type="number" placeholder="Progress" value={this.state.input3} onChange={this.handleChange.bind(this, 'input3')} />
            <label name="icon" className="descriptor">Icon</label>
            <div className="dropdown-wrapper">
              <select value={this.state.selectValue} onChange={this.handleDropdown.bind(this)}>
                <option value="car">Car</option>
                <option value="plane">Plane</option>
                <option value="">None</option>
              </select>
            </div>
          </div>
          <input type="button" className="button" value="Save Changes" onClick={this.saveGoal.bind(this, this.props.item.index)} />
          <a href="#" className="delete" onClick={this.deleteGoal.bind(this, this.props.item.index)}>Delete Goal</a>
        </figure>
      </div>
    );
  }
}

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  }

  dragEnd(e) {
    this.dragged.style.display = 'block';
    placeholder.remove();

    var data = this.state.data;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement == 'after') to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ data: data });
  }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if (e.target.className == 'placeholder') return;
    this.over = e.target;
    var relY = e.pageY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var relX = e.pageX - this.over.offsetLeft;
    var width = this.over.offsetWidth / 2;
    var parent = e.target.parentNode;

    if (relX >= width) {
      this.nodePlacement = 'after';
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    } else {
      this.nodePlacement = 'before';
      parent.insertBefore(placeholder, e.target);
    }
    this.setState({ data: this.props.data });
  }

  onFlip(i) {
    var data = this.state.data;
    data[i].flipped = !data[i].flipped;
    this.setState({ data: data });
    if (data[i].flipped) {
      dragStatus = false;
    } else {
      dragStatus = true;
    }
  }

  onDelete(i) {
    var newData = this.state.data.slice();
    newData.splice(i, 1);
    this.setState({ data: newData });
    this.props = newData;
    var data = this.props.data;
    data[i].flipped = !data[i].flipped;
    if (data[i].flipped) {
      dragStatus = false;
    } else {
      dragStatus = true;
    }
    data = newData;
  }

  render() {
    return (
      <ul className="goal__list" onDragOver={this.dragOver.bind(this)}>
        {this.state.data.map((item, i) => (
          <li
            key={i}
            draggable={dragStatus}
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
          >
            <GoalCard
              item={item}
              onFlip={this.onFlip.bind(this, i)}
              cancelEdit={this.onFlip.bind(this, i)}
              saveGoal={this.onFlip.bind(this, i)}
              onDelete={this.onDelete.bind(this, i)}
            />
          </li>
        ))}
        {/* Placeholder element rendered conditionally */}
        {dragStatus && <li className="placeholder"></li>}
      </ul>
    );
  }
}

const placeholder = document.createElement('li');
placeholder.className = 'placeholder';

const progressUpdate = null;
const goals = [
  {
    category: 'car',
    name: 'Car',
    amount: 20000,
    progress: 6593,
    flipped: false,
    dragStatus: true,
  },
  {
    category: 'plane',
    name: 'Vacation',
    amount: 3500,
    progress: 2984,
    flipped: false,
    dragStatus: true,
  },
];

let dragStatus = true;

ReactDOM.render(<GoalList data={goals} />, document.getElementById('app'));

export default GoalList;