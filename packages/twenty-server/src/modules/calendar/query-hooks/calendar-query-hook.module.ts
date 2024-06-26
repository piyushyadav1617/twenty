import { Module } from '@nestjs/common';

import { ObjectMetadataRepositoryModule } from 'src/engine/object-metadata-repository/object-metadata-repository.module';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';
import { ConnectedAccountWorkspaceEntity } from 'src/modules/connected-account/standard-objects/connected-account.workspace-entity';
import { CalendarChannelEventAssociationWorkspaceEntity } from 'src/modules/calendar/standard-objects/calendar-channel-event-association.workspace-entity';
import { CalendarChannelWorkspaceEntity } from 'src/modules/calendar/standard-objects/calendar-channel.workspace-entity';
import { CalendarEventFindManyPreQueryHook } from 'src/modules/calendar/query-hooks/calendar-event/calendar-event-find-many.pre-query.hook';
import { CalendarEventFindOnePreQueryHook } from 'src/modules/calendar/query-hooks/calendar-event/calendar-event-find-one.pre-query-hook';
import { CanAccessCalendarEventService } from 'src/modules/calendar/query-hooks/calendar-event/services/can-access-calendar-event.service';

@Module({
  imports: [
    ObjectMetadataRepositoryModule.forFeature([
      CalendarChannelEventAssociationWorkspaceEntity,
      CalendarChannelWorkspaceEntity,
      ConnectedAccountWorkspaceEntity,
      WorkspaceMemberWorkspaceEntity,
    ]),
  ],
  providers: [
    CanAccessCalendarEventService,
    {
      provide: CalendarEventFindOnePreQueryHook.name,
      useClass: CalendarEventFindOnePreQueryHook,
    },
    {
      provide: CalendarEventFindManyPreQueryHook.name,
      useClass: CalendarEventFindManyPreQueryHook,
    },
  ],
})
export class CalendarQueryHookModule {}
