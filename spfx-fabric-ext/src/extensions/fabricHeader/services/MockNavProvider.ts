import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export class MockNavProvider {

  public static loadNavigation() : IContextualMenuItem[] {
    var menuItems: IContextualMenuItem[] = [] as IContextualMenuItem[];

    menuItems = [
      {
        key: "home",
        name: "Home",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: 'Home'},
        href: "/",
        subMenuProps: null,
        isSubMenu: false
      },
      {
        key: "departments",
        name: "Departments",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: 'CityNext'},
        subMenuProps: {
          items: [
            {
              key: "sales",
              name: "Sales",
              itemType: ContextualMenuItemType.Normal,
              iconProps:{ iconName: 'Money'},
              href: "/",
              subMenuProps: null,
              isSubMenu: false
            },
            {
              key: "marketing",
              name: "Marketing",
              itemType: ContextualMenuItemType.Normal,
              iconProps:{ iconName: 'Market'},
              href: "/",
              subMenuProps: null,
              isSubMenu: false
            },
            {
              key: "hr",
              name: "HR",
              itemType: ContextualMenuItemType.Normal,
              iconProps:{ iconName: 'People'},
              href: "/",
              subMenuProps: null,
              isSubMenu: false
            }
          ]
        },
        isSubMenu: false
      },
      {
        key: "services",
        name: "Services",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: null},
        href: "/",
        subMenuProps: null,
        isSubMenu: false
      }
    ];

    return menuItems;
  }

  public static loadNavigationFar() : IContextualMenuItem[] {
    var menuItems: IContextualMenuItem[] = [] as IContextualMenuItem[];

    menuItems = [
      {
        key: "bookmarkAdd",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: 'AddBookmark'},
        subMenuProps: null,
        isSubMenu: false,
        iconOnly: true,
        onClick: () => alert('Bookmark Added')
      },
      {
        key: "bookmark",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: 'DoubleBookmark'},
        subMenuProps: null,
        isSubMenu: false,
        iconOnly: true,
        onClick: () => alert('Bookmark Menu')
      },
      {
        key: "info",
        itemType: ContextualMenuItemType.Header,
        iconProps:{ iconName: 'Info'},
        href: "/info",
        subMenuProps: null,
        isSubMenu: false,
        iconOnly: true,
        onClick: () => alert('Info Loaded')
      }
    ];

    return menuItems;
  }

}
