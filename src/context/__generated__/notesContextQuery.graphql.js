/**
 * @flow
 * @relayHash b521767b28fd78502857b5f9478bd05c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateNoteInput = {|
  picture?: ?string,
  uid?: ?string,
  notes?: ?$ReadOnlyArray<?NoteInput>,
  user_id?: ?string,
|};
export type NoteInput = {|
  value?: ?string,
  note_uid?: ?string,
  x?: ?number,
  y?: ?number,
  order?: ?number,
  uid?: ?string,
|};
export type notesContextQueryVariables = {|
  note?: ?CreateNoteInput
|};
export type notesContextQueryResponse = {|
  +createNote: ?boolean
|};
export type notesContextQuery = {|
  variables: notesContextQueryVariables,
  response: notesContextQueryResponse,
|};
*/

/*
query notesContextQuery(
  $note: CreateNoteInput
) {
  createNote(note: $note)
}
*/

const node /*: ConcreteRequest*/ = (function () {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'note',
        type: 'CreateNoteInput',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'ScalarField',
        alias: null,
        name: 'createNote',
        args: [
          {
            kind: 'Variable',
            name: 'note',
            variableName: 'note',
          },
        ],
        storageKey: null,
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'notesContextQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'notesContextQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'query',
      name: 'notesContextQuery',
      id: null,
      text: 'query notesContextQuery(\n  $note: CreateNoteInput\n) {\n  createNote(note: $note)\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'e741c289a2a4751b1d7f17e00b662835';

module.exports = node;
