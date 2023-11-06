import { useEffect, useState } from 'react';

import LookUpOption from '../schemas/LookUpOption';
import LookUpTextField from './LookUpTextField';
import SchemaList from './SchemaList';

import { MemberSchema } from '../schemas/Member';
import { PostResultCenterSchema } from '../schemas/ResultCenter';
import { postMembers } from '../services/MemberService';
import { postResultCenter } from '../services/ResultCenterService';
import { getUsers, getUsersOfType } from '../services/UserService';
import PopUpMensagem from './PopUpMessage';

export default function ResultCenterForm({ callback }: { callback: () => void }) {
    const [postResultCenterName, setPostResultCenterName] = useState<string>('');
    const [postResultCenterCode, setPostResultCenterCode] = useState<string>('');
    const [postResultCenterAcronym, setPostResultCenterAcronym] = useState<string>('');

    const [postResultCenterManager, setPostResultCenterManager] = useState<LookUpOption | undefined>();
    const [availableResultCenterManagers, setAvailableResultCenterManagers] = useState<LookUpOption[]>([]);

    const [postResultCenterMembers, setPostResultCenterMembers] = useState<LookUpOption[]>([]);
    const [selectedResultCenterMemberToAdd, setSelectedResultCenterMemberToAdd] = useState<LookUpOption | undefined>();
    const [availableResultCenterMembersToAdd, setAvailableResultCenterMembersToAdd] = useState<LookUpOption[]>([]);
    const [message, setMessage] = useState<string>('');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    useEffect(() => {
        getUsersOfType('Manager').then(managersResponse => setAvailableResultCenterManagers(managersResponse.map(manager => ({ id: manager.id, name: manager.name, }))));
        getUsers().then(usersResponse => setAvailableResultCenterMembersToAdd(usersResponse.map(user => ({ id: user.id, name: user.name, }))));
    }, [])

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPostResultCenterName(event.target.value)
    }

    function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPostResultCenterCode(event.target.value)
    }

    function handleAcronymChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPostResultCenterAcronym(event.target.value)
    }

    function handleAddMember(newMember: LookUpOption) {
        setPostResultCenterMembers((prevMembers) => [...prevMembers, newMember]);
    }

    function handleRemoveMember(memberToRemove: LookUpOption) {
        setPostResultCenterMembers((prevMembers) => prevMembers.filter((member) => {
            member !== memberToRemove
        }));
    }

    const memberRenderTemplate = (member: LookUpOption) => {
        return (
            <div className="schema-list-item schema-list-item-member">
                <p className="schema-list-item-title schema-list-item-title-member">
                    {member.name}
                </p>
                <button
                    className="schema-list-item-button schema-list-item-button-remove"
                    onClick={() => handleRemoveMember(member)}
                >
                    X
                </button>
            </div>
        );
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!postResultCenterManager) {
            setMessage('Preencha todos os campos obrigatórios.');
            setIsPopUpVisible(true);
            callback();

        }
        else {
            postResultCenter({
                name: postResultCenterName,
                code: parseInt(postResultCenterCode),
                acronym: postResultCenterAcronym,
                gestor: {
                    id: postResultCenterManager.id
                }
            } as PostResultCenterSchema)
                .then(resultCenterResponse => {
                    if (resultCenterResponse) {
                        console.log(postResultCenterMembers);
                        postMembers(
                            postResultCenterMembers.map((user) => ({
                                memberPK: {
                                    user: {
                                        id: user.id,
                                    },
                                    resultCenter: {
                                        id: resultCenterResponse.id
                                    },
                                }
                            })) as MemberSchema[]
                        ).then(() => {
                            setMessage('Apontamento lançado com sucesso.');
                            callback();
                            setIsPopUpVisible(true);
                        })
                    }
                })
                .catch(error => console.error(error))
                .then(() => callback());
        }
        
        setTimeout(() => {
            setIsPopUpVisible(false);
        }, 5000);

    }

    return (
        <form onSubmit={handleSubmit}>
            {isPopUpVisible && (
                <PopUpMensagem text={message} />
            )}
            <input type="text" placeholder="Nome" onChange={handleNomeChange} />
            <input type="text" placeholder="Código" onChange={handleCodeChange} />
            <input type="text" placeholder="Sigla" onChange={handleAcronymChange} />

            {availableResultCenterManagers && (
                <LookUpTextField
                    placeholder="Gestor"
                    options={availableResultCenterManagers}
                    onSelect={(option: LookUpOption) => setPostResultCenterManager(option)}
                />
            )}

            {availableResultCenterMembersToAdd && (
                <div className="result-center-form-add-member">
                    <LookUpTextField
                        placeholder="Adicionar Membro"
                        options={availableResultCenterMembersToAdd}
                        onSelect={(option: LookUpOption) => setSelectedResultCenterMemberToAdd(option)}
                    />
                    {selectedResultCenterMemberToAdd ? (
                        <button
                            className="result-center-form-add-member-button"
                            type="button"
                            onClick={() => handleAddMember(selectedResultCenterMemberToAdd)}
                        > + </button>
                    ) : (
                        <button
                            className="result-center-form-add-member-button result-center-form-add-member-button-disabled"
                            disabled={true}
                        >+</button>
                    )}
                </div>
            )}

            <button type="submit">Cadastrar</button>
            <SchemaList<LookUpOption>
                data={postResultCenterMembers}
                template={memberRenderTemplate}
            />
        </form>
    )
}
