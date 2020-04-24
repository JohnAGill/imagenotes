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


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "viewNotes_getNotes",
  "type": "Notes",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "picture",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "notes",
      "storageKey": null,
      "args": null,
      "concreteType": "Note",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "value",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "x",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "y",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "order",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "uid",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'e55b0774dcb5e28bc1dd534b9b8cfbce';

module.exports = node;
