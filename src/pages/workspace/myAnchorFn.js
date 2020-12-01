// import { Node, Direction, AnchorMode } from 'topology-core';
import { Point } from 'topology-core/models/point';
import { Direction} from 'topology-core/models/direction';
import { Node } from 'topology-core/models/node';
import { AnchorMode } from 'topology-core/models/status';


export default function myAnchors(node) {
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height / 2, Direction.Left));
  // node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height / 2, Direction.Right));
  // node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));
  console.log(node)

  // demo，其他自定义锚点。这里只是示例。
  // for (let i = 10; i < 360; i += 10) {
  //   if (i % 90 === 0) {
  //     continue;
  //   }

  //   const direction = Math.floor(i / 90);
  //   const pt = new Point(
  //     node.rect.center.x + (Math.sin((i / 180) * Math.PI) * node.rect.width) / 2,
  //     node.rect.center.y + (Math.cos((i / 180) * Math.PI) * node.rect.height) / 2,
  //     direction
  //   );
  //   pt.hidden = false;
  //   node.anchors.push(pt);
  //   console.log('pt:', pt,'node',node)
  // }
}
