/**
 * @flow
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
  text_color?: ?string,
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
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'note',
        type: 'CreateNoteInput',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'note',
            variableName: 'note',
          },
        ],
        kind: 'ScalarField',
        name: 'createNote',
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Fragment',
      metadata: null,
      name: 'notesContextQuery',
      selections: (v1 /*: any*/),
      type: 'Query',
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Operation',
      name: 'notesContextQuery',
      selections: (v1 /*: any*/),
    },
    params: {
      id: null,
      metadata: {},
      name: 'notesContextQuery',
      operationKind: 'query',
      text: 'query notesContextQuery(\n  $note: CreateNoteInput\n) {\n  createNote(note: $note)\n}\n',
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'e741c289a2a4751b1d7f17e00b662835';

module.exports = node;
