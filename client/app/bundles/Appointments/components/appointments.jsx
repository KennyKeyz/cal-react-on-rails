import React from 'react';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';

import update from 'immutability-helper';

export default class Appointments extends React.Component{

	constructor(props, railsContext){
		super(props)
		this.state = {
			appointments: this.props.appointments,
			title: 'Team meeting',
			appt_time:'Tomorrow at 9am'

		}
	}

	handleUserInput (obj){
		this.setState(obj);
	}

	handleFormSubmit (){
		var appointment = {title: this.state.title, appointment_time: this.state.appt_time};
		$.post('/appointments',
			{appointment: appointment})
		.done((data) => {

				this.addNewAppointment(data);
			});
	}

	addNewAppointment (appointment){
		//var appointments = React.addons.update(this.state.appointments, {$push: [appointment]});
		let appointments = this.state.appointments.push(appointment)
    
                       
                  
                      

		this.setState({
			appointments: appointments
		})

	}





	render (){
		return (
			<div>

			<AppointmentForm input_title={this.state.title} 
			                 input_appt_time={this.state.appt_time}
			                 onUserInput = {(obj) => this.handleUserInput(obj)}
			                 onFormSubmit={() => this.handleFormSubmit()} />



			<AppointmentsList appointments={this.props.appointments} />
           
			</div>
			)
	}
};