/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type viewNotes_getNotes$ref: FragmentReference;
declare export opaque type viewNotes_getNotes$fragmentType: viewNotes_getNotes$ref;
export type viewNotes_getNotes = $ReadOnlyArray<{|
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
  +$refType: viewNotes_getNotes$ref,
|}>;
export type viewNotes_getNotes$data = viewNotes_getNotes;
export type viewNotes_getNotes$key = $ReadOnlyArray<{
  +$data?: viewNotes_getNotes$data,
  +$fragmentRefs: viewNotes_getNotes$ref,
  ...
}>;
*/

const node /*: ReaderFragment*/ = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: {
    plural: true,
  },
  name: 'viewNotes_getNotes',
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
  type: 'Notes',
};
// prettier-ignore
(node/*: any*/).hash = '56c1983ec38c3f38f98fc7461a194767';

module.exports = node;
