"use strict";
import React from 'react'
import {Link} from 'react-router'
import api from 'app/api.js'
import Button from 'app/components/button.jsx'
import Utils from 'app/components/utils.js'


class DeleteRatio extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dependents: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    Utils.setTitle('Delete ratio')
    var ratioId = this.props.params.ratioId
    this._req = api.delete(['ratios', ratioId]).then(
      resp => this.setState({dependents: resp})
    )
  }

  renderRatios(ratio, idx) {
    return <li key={idx}>
      <Link to={`/ratios/${ratio.id}/`}>{ratio.ratio_name}</Link>
    </li>
  }

  renderScreens(screen, idx) {
    return <li key={idx}>
      <Link to={screen.url}>{screen.name}</Link>
    </li>
  }

  handleSubmit() {
    var ratioId = this.props.params.ratioId
    return api.delete(['ratios', ratioId], {confirm: true}).then(
      () => window.location = '/ratios/'
    )
  }

  render() {
    var dependents = this.state.dependents
    if(!dependents)
      return <h3>Loading...</h3>
    var ratiosList = dependents.ratios.length > 0 && <div>
      <p><strong>Following ratios will also be deleted:</strong></p>
      <ul>{dependents.ratios.map(this.renderRatios)}</ul>
    </div>
    var screensList = dependents.screens.length > 0 && <div>
      <p><strong>Following screens will also be deleted:</strong></p>
      <ul>{dependents.screens.map(this.renderScreens)}</ul>
    </div>
    return <div>
      <h3>Are you sure you want to delete?</h3>
      {ratiosList}
      {screensList}
      <Button
        style="danger"
        icon="garbage"
        onClick={this.handleSubmit}
        name="Confirm Delete"
      />
    </div>
  }
}

DeleteRatio.propTypes = {
  params: React.PropTypes.object.isRequired
}

module.exports = DeleteRatio
