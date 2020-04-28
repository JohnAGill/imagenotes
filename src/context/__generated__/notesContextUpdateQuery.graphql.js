/**
 * @flow
 * @relayHash 252049c004de6ad54be2de47c1477515
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NoteInput = {|
  value?: ?string,
  note_uid?: ?string,
  x?: ?number,
  y?: ?number,
  order?: ?number,
  uid?: ?string,
|};
export type notesContextUpdateQueryVariables = {|
  notes?: ?$ReadOnlyArray<?NoteInput>
|};
export type notesContextUpdateQueryResponse = {|
  +updateNote: ?boolean
|};
export type notesContextUpdateQuery = {|
  variables: notesContextUpdateQueryVariables,
  response: notesContextUpdateQueryResponse,
|};
*/

/*
query notesContextUpdateQuery(
  $notes: [NoteInput]
) {
  updateNote(notes: $notes)
}
*/

const node /*: ConcreteRequest*/ = (function () {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'notes',
        type: '[NoteInput]',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'ScalarField',
        alias: null,
        name: 'updateNote',
        args: [
          {
            kind: 'Variable',
            name: 'notes',
            variableName: 'notes',
          },
        ],
        storageKey: null,
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'notesContextUpdateQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'notesContextUpdateQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'query',
      name: 'notesContextUpdateQuery',
      id: null,
      text: 'query notesContextUpdateQuery(\n  $notes: [NoteInput]\n) {\n  updateNote(notes: $notes)\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'a0eea01394b43bdea6d9bf3eea964614';

module.exports = node;
