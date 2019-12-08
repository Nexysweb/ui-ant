import Form from 'components/generic/detail/form';
import ToggleWData from 'components/generic/detail/toggle-w-data'

import View from 'components/business/view';
import { OptionSet, Thread, File, Tags, Address } from 'components/business';

import ClassicStatusLog from 'components/business/status-log';
import ClassicAssociatedEntity from 'components/business/associated-entity';

import WorkflowTransition from 'app/workflow/transition/index';

import StatusLog from 'components/entity/status-log/index';
import AssociatedEntity from 'components/entity/associated-entity/index';

import Attribute from 'app/entity/attribute/index';
import Page from 'app/entity/page/index';
import FunctionalView from 'app/entity/functional-view/index';

import NotificationScope from 'app/scope/notification/index';


const viewDictionary = key => {
  switch(key) {
    case 'form':
      return Form;
    case 'detail':
      return View;
    case 'toggle':
      return ToggleWData;
    case 'statusLog':
      return StatusLog;
    case 'classicStatusLog':
      return ClassicStatusLog;
    case 'optionSet':
      return OptionSet;
    case 'thread':
      return Thread;
    case 'file':
      return File;
    case 'address':
      return Address;
    case 'tags':
      return Tags;
    case 'associatedEntity':
      return AssociatedEntity;
    case 'workflowTransition':
      return WorkflowTransition;
    //case 'associatedEntityAdmin':
    //  return AssociatedEntityAdmin;
    case 'classicAssociatedEntity':
      return ClassicAssociatedEntity;
    case 'attribute':
      return Attribute;
    case 'page':
      return Page;
    case 'functionalView':
      return FunctionalView;
    case 'notificationScope':
      return NotificationScope;
    default:
      return View;
  }
}

export default viewDictionary;