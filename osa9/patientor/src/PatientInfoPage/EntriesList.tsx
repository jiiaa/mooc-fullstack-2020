import React from 'react';
import { List } from 'semantic-ui-react';

import { Diagnose, Entry } from '../types';
import { useStateValue } from '../state';

type EntryProps = {
  entry: Entry;
};

const EntriesList = ({ entry }: EntryProps) => {
  const [{ diagnoseList }] = useStateValue();
  console.log('entry:', entry);
  return (
    <>
      <p>{entry.description}</p>
      <List bulleted>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string) =>
          <List.Item key={code}>
            <strong>{code}</strong>
            {diagnoseList.filter((diagnose: Diagnose) => {
              return diagnose.code === code;
            }).map((item: Diagnose) =>
              <span key={item.code}>: {item.name}</span>
            )
            }
          </List.Item>
        )}
      </List>
    </>
  );
};

export default EntriesList;