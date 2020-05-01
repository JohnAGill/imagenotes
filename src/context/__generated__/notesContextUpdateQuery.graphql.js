/**
 * @flow
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
  text_color?: ?string,
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
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'notes',
        type: '[NoteInput]',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'notes',
            variableName: 'notes',
          },
        ],
        kind: 'ScalarField',
        name: 'updateNote',
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Fragment',
      metadata: null,
      name: 'notesContextUpdateQuery',
      selections: (v1 /*: any*/),
      type: 'Query',
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Operation',
      name: 'notesContextUpdateQuery',
      selections: (v1 /*: any*/),
    },
    params: {
      id: null,
      metadata: {},
      name: 'notesContextUpdateQuery',
      operationKind: 'query',
      text: 'query notesContextUpdateQuery(\n  $notes: [NoteInput]\n) {\n  updateNote(notes: $notes)\n}\n',
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'a0eea01394b43bdea6d9bf3eea964614';

module.exports = node;
