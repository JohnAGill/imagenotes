/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type viewNotesQueryVariables = {|
  userId?: ?string
|};
export type viewNotesQueryResponse = {|
  +getNotes: ?$ReadOnlyArray<?{|
    +picture: ?string,
    +notes: ?$ReadOnlyArray<?{|
      +value: ?string,
      +x: ?number,
      +y: ?number,
      +order: ?number,
      +uid: ?string,
      +note_uid: ?string,
      +text_color: ?string,
    |}>,
  |}>
|};
export type viewNotesQuery = {|
  variables: viewNotesQueryVariables,
  response: viewNotesQueryResponse,
|};
*/

/*
query viewNotesQuery(
  $userId: String
) {
  getNotes(userId: $userId) {
    picture
    notes {
      value
      x
      y
      order
      uid
      note_uid
      text_color
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'userId',
        type: 'String',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'userId',
            variableName: 'userId',
          },
        ],
        concreteType: 'Notes',
        kind: 'LinkedField',
        name: 'getNotes',
        plural: true,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'picture',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Note',
            kind: 'LinkedField',
            name: 'notes',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'value',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'x',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'y',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'order',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'uid',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'note_uid',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'text_color',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Fragment',
      metadata: null,
      name: 'viewNotesQuery',
      selections: (v1 /*: any*/),
      type: 'Query',
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: (v0 /*: any*/),
      kind: 'Operation',
      name: 'viewNotesQuery',
      selections: (v1 /*: any*/),
    },
    params: {
      id: null,
      metadata: {},
      name: 'viewNotesQuery',
      operationKind: 'query',
      text:
        'query viewNotesQuery(\n  $userId: String\n) {\n  getNotes(userId: $userId) {\n    picture\n    notes {\n      value\n      x\n      y\n      order\n      uid\n      note_uid\n      text_color\n    }\n  }\n}\n',
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'a990fa7fe39ba6b57787532e76de961e';

module.exports = node;
