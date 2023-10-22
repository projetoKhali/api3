import React from 'react';


import { useEffect, useState } from 'react';
import { PostAppointmentSchema } from '../schemas/Appointment';
import DropdownOption from '../schemas/DropdownOption';
import LookUpOption from '../schemas/LookUpOption';



import { UserSchema } from '../schemas/User';
import { postAppointment } from '../services/AppointmentService';

import { getClients } from '../services/ClientService';
import { getProjects } from '../services/ProjectService';
import { getResultCentersOfUser } from '../services/ResultCenterService';
import AppointmentTypeDropdown from './AppointmentTypeDropdown';
import LookUpTextField from './LookUpTextField';

interface AppointmentFormProps {
    userLoggedIn: UserSchema
    successCallback: () => void;
    errorCallback: () => void;
}

export default function AppointmentForm ({ userLoggedIn, successCallback, errorCallback }: AppointmentFormProps) {
    const [postAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentJustification, setPostAppointmentJustification] = useState<string>('');

    const [postAppointmentType, setPostAppointmentType] = useState<string>('');

    const [postAppointmentClient, setPostAppointmentClient] = useState<LookUpOption | undefined>();
    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);

    const [postAppointmentResultCenter, setPostAppointmentResultCenter] = useState<LookUpOption | undefined>();
    const [availableResultCenters, setAvailableResultCenters] = useState<LookUpOption[]>([]);

    const [postAppointmentProject, setPostAppointmentProject] = useState<LookUpOption | undefined>();
    const [availableProjects, setAvailableProjects] = useState<LookUpOption[]>([]);

    useEffect(() => {
        getClients().then( clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name, }))));
        getResultCentersOfUser(userLoggedIn).then( resultCentersResponse => setAvailableResultCenters(resultCentersResponse.map(resultCenter => ({ id: resultCenter.id, name: resultCenter.name, }))));
        getProjects().then( projectsResponse => setAvailableProjects(projectsResponse.map(project => ({ id: project.id, name: project.name, }))));
    }, [])

    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentEndDate(event.target.value); }
    function handleJustificationChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentJustification(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!postAppointmentType
        || !postAppointmentStartDate
        || !postAppointmentEndDate
        || !postAppointmentResultCenter
        || !postAppointmentClient
        || !postAppointmentProject
        || !postAppointmentJustification
        ) errorCallback();

      else {

        const formattedStartDate = formatDateTime(postAppointmentStartDate);
        const formattedEndDate = formatDateTime(postAppointmentEndDate);

        postAppointment({
          user: {
            id: userLoggedIn.id
          },
          type: postAppointmentType,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          resultCenter: {
              id: postAppointmentResultCenter.id,
          },
          client: {
              id: postAppointmentClient.id,
          },
          project: {
              id: postAppointmentProject.id,
          },
          justification: postAppointmentJustification,
        } as PostAppointmentSchema)
        .then(() => successCallback());
      }
    }

    return (
      <form onSubmit={handleSubmit}>

          <AppointmentTypeDropdown
            onSelect={(option: DropdownOption) => {
                setPostAppointmentType(option.optionName);
            }}
          />

          <input type="text" placeholder="Início" onChange={handleStartDateChange}/>
          <input type="text" placeholder="Fim" onChange={handleEndDateChange}/>


          {availableClients && (
              <LookUpTextField
                  placeholder="Cliente"
                  options={availableClients}
                  onSelect={(option: LookUpOption) => setPostAppointmentClient(option) }
              />
          )}

          {availableResultCenters && (
              <LookUpTextField
                  placeholder="Centro de Resultado"
                  options={availableResultCenters}
                  onSelect={(option: LookUpOption) => setPostAppointmentResultCenter(option) }
              />
          )}

          {availableProjects && (
              <LookUpTextField
                  placeholder="Projeto"
                  options={availableProjects}
                  onSelect={(option: LookUpOption) => setPostAppointmentProject(option) }
              />
          )}

          <input type="text" placeholder="Justificativa" onChange={handleJustificationChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    );
}

function formatDateTime(dateTimeStr: string): string {
  const parts = dateTimeStr.split(' ');
  const dateParts = parts[0].split('/');
  const timeParts = parts[1].split(':');
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const formattedTime = `${timeParts[0]}:${timeParts[1]}:00.000+00:00`;
  return `${formattedDate}T${formattedTime}`;
}
