/**
 * @flow
 * @relayHash 63e8d31718ca17da7f8abc11f72bc82e
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
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function () {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'userId',
        type: 'String',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'LinkedField',
        alias: null,
        name: 'getNotes',
        storageKey: null,
        args: [
          {
            kind: 'Variable',
            name: 'userId',
            variableName: 'userId',
          },
        ],
        concreteType: 'Notes',
        plural: true,
        selections: [
          {
            kind: 'ScalarField',
            alias: null,
            name: 'picture',
            args: null,
            storageKey: null,
          },
          {
            kind: 'LinkedField',
            alias: null,
            name: 'notes',
            storageKey: null,
            args: null,
            concreteType: 'Note',
            plural: true,
            selections: [
              {
                kind: 'ScalarField',
                alias: null,
                name: 'value',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'x',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'y',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'order',
                args: null,
                storageKey: null,
              },
              {
                kind: 'ScalarField',
                alias: null,
                name: 'uid',
                args: null,
                storageKey: null,
              },
            ],
          },
        ],
      },
    ];
  return {
    kind: 'Request',
    fragment: {
      kind: 'Fragment',
      name: 'viewNotesQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    operation: {
      kind: 'Operation',
      name: 'viewNotesQuery',
      argumentDefinitions: (v0 /*: any*/),
      selections: (v1 /*: any*/),
    },
    params: {
      operationKind: 'query',
      name: 'viewNotesQuery',
      id: null,
      text:
        'query viewNotesQuery(\n  $userId: String\n) {\n  getNotes(userId: $userId) {\n    picture\n    notes {\n      value\n      x\n      y\n      order\n      uid\n    }\n  }\n}\n',
      metadata: {},
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = 'cf412b36f17363400b32695c0d596f8e';

module.exports = node;
