import React from 'react';
import 'rbx/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Content, Field, Label, Control, Input, Radio, Textarea, File, Select } from 'rbx';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'firebase/database';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import db from '../App';




export function DatePickers({selectedDate, setSelectedDate}) {
  // The first commit of Material-UI

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Pick Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export function TimePickers({selectedTimeFrom,selectedTimeTo,setSelectedTimeFrom,setSelectedTimeTo}) {
  // The first commit of Material-UI

  const handleTimeChangeFrom = date => {
    setSelectedTimeFrom(date);
  };
  const handleTimeChangeTo = date => {
    setSelectedTimeTo(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-from"
          label="From"
          value={selectedTimeFrom}
          onChange={handleTimeChangeFrom}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker-to"
          label="To"
          value={selectedTimeTo}
          onChange={handleTimeChangeTo}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}


const EventTemplate = ({ hostID }) => {
  const [EventName, setEventName] = React.useState('');
  const [FoodType, setFoodType] = React.useState('');
  const [DietaryRestrictions, setDietaryRestrictions] = React.useState('');
  const [Organization, setOrganization] = React.useState('');
  const [Location, setLocation] = React.useState('');
  
  const [Member_Only, setMemberOnly] = React.useState('');
  const [Event_Type, setEventType] = React.useState('');
  
  const [Description, setDescription] = React.useState('');
  
  const [FileUpload, setFileUpload] = React.useState('');

  const [selectedTimeFrom, setSelectedTimeFrom] = React.useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  const submitEvent = () => {
    const ref = db.ref('')
    console.log("printed")
    ref.push({
      cost: 5,
      date: selectedDate,
      day_of_week: weekday[selectedDate.getDay()],
      description: Description,
      dietary_restrictions: DietaryRestrictions,
      event_type: Event_Type,
      food_type: FoodType,
      location: Location,
      membership: Member_Only,
      name: EventName,
      organization: Organization,
      time_end: selectedTimeTo,
      time_start: selectedTimeFrom
    })
  }
  
    return (
        <Card>
            <Card.Content>
                <Field>
                    <Label>Event Name</Label>
                    <Control>
                        <Input type="text" placeholder="Name of Event" value={EventName}
        onChange={e => setEventName(e.target.value)} />
                    </Control>
                </Field>
                <DatePickers selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                <TimePickers selectedTimeFrom={selectedTimeFrom} selectedTimeTo={selectedTimeTo} setSelectedTimeFrom={setSelectedTimeFrom} setSelectedTimeTo={setSelectedTimeTo} />
                <Field>
                    <Label>Food Type</Label>
                    <Control>
                        <Input type="text" placeholder="Food Type" value={FoodType}
        onChange={e => setFoodType(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Label>Dietary Restrictions</Label>
                    <Control>
                        <Input type="text" placeholder="Dietary Restrictions" value={DietaryRestrictions}
        onChange={e => setDietaryRestrictions(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                    <Label>Organization</Label>
                    <Control>
                        <Input type="text" placeholder="Organization Name" value={Organization}
        onChange={e => setOrganization(e.target.value)} />
                    </Control>
                </Field>
                <Field>
                  <Label>Event Type</Label>
                  <Select.Container>
                    <Select>
                      <Select.Option value = {Event_Type} onChange={e => setEventType("Social")}>Social</Select.Option>
                      <Select.Option value = {Event_Type} onChange={e => setEventType("Professional")}>Professional</Select.Option>
                    </Select>
                  </Select.Container>
                </Field>
                <Field>
                    <Label>Member Only?</Label>
                    <Control>
                        <Label>
                            <Radio name="exclusive" value = {Member_Only} 
                            onChange={e => setMemberOnly("Yes")} /> Yes
                        </Label>
                        <Label>
                            <Radio name="exclusive" value = {Member_Only} 
                            onChange={e => setMemberOnly("No")}  /> No
                        </Label>
                    </Control>
                </Field>
                <Field>
                    <Label>Description</Label>
                    <Control>
                        <Textarea placeholder="Description" value={Description}
        onChange={e => setDescription(e.target.value)}/>
                    </Control>
                </Field>
                <File >
                    <File.Label>
                        <File.Input name="resume" onChange={e => setFileUpload(e.target.files[0]) }/>
                        <File.CTA>
                            <File.Icon>
                                <FontAwesomeIcon icon={faUpload} />
                            </File.Icon>
                            <File.Label as="span">Choose a File</File.Label>
                        </File.CTA>
                    </File.Label>
                </File>
                <Field kind="group" align="right">
                    <Control>
                        <Button onClick={submitEvent} color="primary">Confirm Event</Button>
                    </Control>
                </Field>
            </Card.Content>
        </Card>
    )
}

export default EventTemplate;
