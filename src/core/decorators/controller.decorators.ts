import { Controller } from '@nestjs/common';

export const CmsController =
  (controllerName?: string): ClassDecorator =>
  (target: any) => {
    const controller = controllerName ? `/${controllerName}` : '';
    Controller(`cms${controller}`)(target);
  };

export const AppController =
  (controllerName?: string): ClassDecorator =>
  (target: any) => {
    Controller(`${controllerName}`)(target);
};

export const RoomController =
  (controllerName?: string): ClassDecorator =>
  (target: any) => {
    const controller = controllerName ? `/${controllerName}` : '';
     Controller(`room${controller}`)(target);
};